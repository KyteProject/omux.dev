---
title: "Ubuntu on Windows: Your Step-By-Step Guide to WSL2 Installation"
author: Daniel Smith
pubDatetime: 2022-09-21T05:17:19Z
postSlug: ubuntu-on-windows-developers-guide-to-wsl2-setup
featured: false
draft: false
comments: true
categories:
  - Tutorials
tags:
  - WSL2
  - Ubuntu on WSL2
  - Install PostgreSQL on Ubuntu
  - Go programming on WSL2
  - Neovim
  - AstroVim
  - Docker on WSL2
  - Google Chrome on WSL2
  - Postman on WSL2
  - Windows Subsystem for Linux
  - Linux on Windows
  - Web development setup
  - WSL2 setup guide
  - Coding environment on Windows
ogImage: "/images/gabriel-heinzer-4Mw7nkQDByk-unsplash.jpg"
description: "Learn how to set up a robust and efficient development environment using WSL2. Ubuntu, PostgreSQL, Go, Neovim, AstroVim, Docker, and other essential tools."
---

<!-- ![Setting Up WSL2: An Extensive Guide](/images/pexels-kevin-ku-577585.jpg) -->

![Setting Up WSL2: An Extensive Guide](/images/pexels-kevin-ku-577585.jpg)

## Table of contents

## Setting Up WSL2: An Extensive Guide

The advent of the Windows Subsystem for Linux (WSL) has brought about a paradigm shift in the way developers operate on Windows-based systems in recent years. The Windows Subsystem for Linux (WSL) enables the seamless execution of a GNU/Linux environment on Windows, sans modification, and minus the resource-intensive nature of a virtual machine.

In this article, I will be sharing my personal approach to installing and configuring an Ubuntu instance on a fresh WSL2 host. This comprehensive guide is tailored to individuals with a foundational level of technical literacy while also being accessible to beginners.

## Install WSL2

If you have not yet installed WSL2, this is the first step towards a more seamless Linux experience on your Windows machine. WSL2, or Windows Subsystem for Linux version 2, is a compatibility layer that enables native execution of Linux binaries on Windows 10 and Windows Server 2019. It provides significant performance enhancements over WSL1, full system call compatibility, and native Docker container execution.

First, you must ensure that your Windows version supports WSL2. You can do this by verifying your Windows version; Windows 10 version 1903 or later is required for WSL2.

After confirming your version, you can proceed with the installation. Microsoft has provided detailed instructions on how to install WSL2, and it is recommended that you follow the guide directly from their website for the most accurate and up-to-date information.

In brief, you'll be following these steps:

1. Enable the WSL and Virtual Machine Platform optional features.
2. Set WSL2 as your default version.
3. Install a Linux distribution, such as Ubuntu.

In addition to its comprehensive documentation, Microsoft's guide provides additional instructions for upgrading from WSL1 to WSL2 and resolving common technical issues.

As always, take care when making system-level changes, and don't hesitate to seek out help if you encounter any difficulties.

For further information, visit Microsoft's official guide on [installing WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

> As of November 2022, WSL is [now available](https://devblogs.microsoft.com/commandline/the-windows-subsystem-for-linux-in-the-microsoft-store-is-now-generally-available-on-windows-10-and-11/) as a Windows Store app for both Windows 10 and Windows 11. This means previous tutorials related to installing WSL as a Windows feature are no longer required.

To begin, run the installation command as an administrator in `Powershell`:

```powershell
wsl --install
```

This command will install a fully up-to-date version of WSL2, as well as the Ubuntu distribution.

## Configure Ubuntu

![Ubuntu prompt sudo](/images/gabriel-heinzer-4Mw7nkQDByk-unsplash.jpg)

Once the installation completes, you'll need to configure the Ubuntu environment to fit your needs. This includes setting up your shell, updating Ubuntu, and installing any necessary software.

### Update and Upgrade Ubuntu

To ensure that your Ubuntu system is up-to-date, it is essential to update your package list and upgrade any outdated packages. This can be achieved by executing the following commands:

```bash
sudo apt update -y
sudo apt upgrade -y
```

This keeps your system up to date by delivering the most recent security updates and bug fixes.

### Install Zsh

Now let's proceed with the installation of `zsh` and change your default shell to it. The command `usermod` changes the user login shell, where `-s` stands for shell and `$(whoami)` returns your username:

```bash
sudo apt install zsh
sudo usermod -s /usr/bin/zsh $(whoami)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

You'll also want to install [Starship](https://starship.rs/), a quick and customisable shell prompt that displays important information as you work:

```bash
curl -sS https://starship.rs/install.sh | sh
```

For an enhanced shell experience, it is recommended to install [Starship](https://starship.rs/), a fast and customizable prompt for any shell:

```bash
git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search
```

### Install [GitHub - ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts)

Nerd Fonts is a collection of over 50 patched fonts for developers. You can install 'nerd-fonts' on your Windows host using [Chocolatey](https://community.chocolatey.org/packages), a software management automation tool, so that the terminal displays the correct symbols:

```powershell
  choco install nerd-fonts-hack
```

### Make Sure Git is Installed

`Git` is a distributed version control system and is a necessary tool for most developers. To install it, use the following command:

```bash
sudo apt install git
```

### Copy SSH keys and CHMOD Them

SSH keys provide a secure way of logging into a server with no need for a password. First, you'll need to copy any private keys you have into the correct directory `~/.ssh`. The public key (`.pub` file) should have a permission of `644 (-rw-r--r--)` and the private key (`id_rsa`) should have `600 (-rw-------)`.

Once you have copied the keys, add them to the `authorized_keys` file:

```bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

Then, ensure your keys have the correct permissions. This command recursively removes all “group” and “other” permissions for the `~/.ssh/` directory:

```bash
chmod -R go= ~/.ssh
```

### Clone Dotfiles

Next, clone your `dotfiles` repository. Here's an example using a hypothetical repository:

```bash
git init
git remote add origin git@github.com:Omux/dot-files.git
git remote -v
git pull origin master
```

### Configure Git Credential Store

To prevent `git` from asking for your username and password every time you perform a repository operation, set `git` to use the credential memory cache:

```bash
git config credential.helper store
```

### Remove Password

For those who don't want to enter their password every time they use `sudo`, modify the `sudoers.d` file to disable the password prompt:

```bash
sudo vim /etc/sudoers.d/dan
```

Add the following line:

```bash
MY_USERNAME ALL=(ALL) NOPASSWD:ALL
```

Replace `MY_USERNAME` with your actual username. If you don't, you'll receive an error saying `no valid sudoers sources found`.

## Setup Development Environments

![Boy in White T-shirt Sitting on Chair in Front of Computer
](/images/pexels-cottonbro-studio-4709285.jpg)

This is the part where you set up the software required for your development needs. This can range from programming languages like Python, Rust or Go to package managers such as `npm` and `yarn`.

### Install NVM, Node.js and Yarn Package Manager

`NVM` (Node Version Manager) allows you to install and manage multiple versions of Node.js. After installing `NVM`, we'll use it to install the latest Long Term Support (LTS) version of Node.js. `Yarn` is a reliable and fast dependency manager for Node.js:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
nvm install --lts
npm install --global yarn
```

### Install Python

Python is a popular, general-purpose programming language. To install Python and its development headers:

```bash
sudo apt-get install python3 python3-dev -y
```

### Install Rust

`Rust` is a systems programming language that runs blasingly fast and prevents segfaults, guaranteeing thread safety. To install `Rust`, download and execute the following script from the official website:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Install LSD

`LSD` is a modern replacement for the traditional `ls` command. It provides more features and better defaults. It is also significantly faster than all other `ls` variants:

```bash
cargo install lsd
```

### Install PostgreSQL

PostgreSQL is an advanced open-source relational database. It provides a robust implementation of SQL, with advanced features such as stored procedures and triggers. To install PostgreSQL, you'll need to update your Ubuntu package list and then install the necessary packages:

```bash
sudo apt update
sudo apt install postgresql postgresql-client postgresql-client-common postgresql-common postgresql-contrib -y
```

Verify the installed version of PostgreSQL with:

```bash
psql --version
```

Start the PostgreSQL service:

```bash
sudo service postgresql start
```

Now, we will log in as the `postgres` user and launch `psql`, the command-line interface to PostgreSQL:

```bash
sudo -i -u postgres
psql
```

Set a password for the `postgres` user:

```sql
ALTER USER postgres PASSWORD 'password';
```

To connect to the PostgreSQL server from a Windows client like pgAdmin, you can use the IP address displayed by the `ip route` command inside WSL.

### Install Go

Go (often referred to as Golang) is a statically typed, compiled programming language designed at Google. It provides excellent support for concurrent programming and is highly efficient. The following commands will install Go and add it to your PATH:

```bash
sudo rm -rf /usr/local/g
wget <https://go.dev/dl/go1.20.1.linux-amd64.tar.gz>
sudo tar -C /usr/local -xzf go1.20.1.linux-amd64.tar.gz

export PATH=$PATH:/usr/local/go/bin

go version
```

### Install Neovim

Neovim is a highly configurable text editor built to enable efficient text editing. It is an extension of Vim, with many new and improved features. The following commands will install Neovim and make it the default editor:

```bash
sudo apt update
sudo apt install libfuse2
sudo apt install unzip

curl -LO <https://github.com/neovim/neovim/releases/latest/download/nvim.appimage>
chmod u+x nvim.appimage
sudo mv ./nvim.appimage /usr/local/bin/nvim.appimage

CUSTOM_NVIM_PATH=/usr/local/bin/nvim.appimage
# Set the above with the correct path, then run the rest of the commands:
set -u
sudo update-alternatives --install /usr/bin/ex ex "${CUSTOM_NVIM_PATH}" 110
sudo update-alternatives --install /usr/bin/vi vi "${CUSTOM_NVIM_PATH}" 110
sudo update-alternatives --install /usr/bin/view view "${CUSTOM_NVIM_PATH}" 110
sudo update-alternatives --install /usr/bin/vim vim "${CUSTOM_NVIM_PATH}" 110
sudo update-alternatives --install /usr/bin/vimdiff vimdiff "${CUSTOM_NVIM_PATH}" 110
```

### Install AstroVim

AstroVim is a Neovim configuration aiming to provide an out-of-the-box experience with the best plugins for efficient development. It leverages the power of the Neovim 0.5 API and Lua to provide fast and snappy performance. Here are the steps to install and set up AstroVim:

First, you may want to back up any existing Neovim configuration:

```bash
mv ~/.config/nvim ~/.config/nvim.bak
mv ~/.local/share/nvim/site ~/.local/share/nvim/site.bak
```

Ensure your system is up-to-date and install some prerequisite packages:

```bash
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install build-essential
sudo apt-get install aptitude
sudo apt-get install libstdc++6
```

Install some necessary tools:

```bash
cargo install tree-sitter-cli
sudo apt-get install ripgrep

LAZYGIT_VERSION=$(curl -s "<https://api.github.com/repos/jesseduffield/lazygit/releases/latest>" | grep '"tag_name":' |  sed -E 's/.*"v*([^"]+)".*/\\1/')
curl -Lo lazygit.tar.gz "<https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz>"
sudo tar xf lazygit.tar.gz -C /usr/local/bin lazygit
lazygit --version

sudo add-apt-repository ppa:daniel-milde/gdu
sudo apt-get update
sudo apt install gdu

rustup update stable
cargo install bottom --locked
```

Clone the AstroVim configuration into your local Neovim configuration directory:

```bash
git clone https://github.com/AstroNvim/AstroNvim ~/.config/nvim
nvim
```

Copy the user configuration example (or your own if you have one) to your user configuration directory:

```bash
cp -r ~/.config/nvim/lua/user_example/ ~/.config/nvim/lua/user/
```

Visit [this link](https://askubuntu.com/questions/726539/sudo-apt-get-install-libstdc) for more information about installing `libstdc`.

### Install Additional/Work-related Dependencies

Here are a few examples of installing additional dependencies. Be sure to modify these instructions according to your specific needs. The following commands will install Google Cloud SDK, kubectl, Git LFS, PHP and its extensions, Composer, and Helm:

```bash
sudo apt-get install apt-transport-https ca-certificates gnupg
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
sudo apt-get update && sudo apt-get install google-cloud-cli
sudo apt-get install kubectl

curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs

sudo apt-install php-curl php-simplexml

sudo apt update
sudo apt install php-cli unzip
cd ~
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
HASH=`curl -sS https://composer.github.io/installer.sig`
php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer

curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

## Additional Steps

Please keep in mind that the actions below are only required if you plan to execute certain apps within the Windows Subsystem for Linux (WSL). This is generally necessary when services running in WSL cannot be accessed directly from the Windows host.

For applications like Docker, it is typically recommended to utilise the Docker Desktop application for Windows instead of installing it directly onto WSL. Docker Desktop is specifically designed to run on Windows and offers seamless integration with the host operating system, as well as a user-friendly interface.

Similarly, for API testing with Postman, the application is also available as a native Windows program. Therefore, you may find it more convenient and efficient to run Postman directly from Windows.

However, installation of these applications within WSL may be required under specific conditions. For example, if you need to interact with services that are not readily accessible from the host system, or if you want to maintain a consistent workflow within the Linux environment.

Consider that activating such functionalities may necessitate additional configuration steps, such as enabling `systemd` in WSL, as described in earlier sections of this guide. Always be mindful of your specific development needs and adjust your environment accordingly.

### Install Docker

Docker is an open-source platform that automates the deployment, scaling, and management of applications using containerization. Follow the instructions provided in the [official Docker documentation](https://docs.docker.com/engine/install/ubuntu/) to install Docker on Ubuntu.

Here is an example of the steps I take when installing Docker **on WSL directly**.

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo service docker start

sudo groupadd docker
sudo gpasswd -a dan docker
docker run hello-world
```

### Install Google Chrome

Google Chrome is a cross-platform web browser developed by Google. To install Google Chrome, execute the following commands:

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
sudo apt -f install
sudo apt install google-chrome-stable
```

### Install Postman

Postman is a popular tool for testing APIs. However, installation requires using `snapd` package manager and the `systemd` init system, which isn't supported in WSL out of the box. As of Windows 11, you can enable `systemd` support in WSL. Follow the guide in this [Microsoft blog post](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/#set-the-systemd-flag-set-in-your-wsl-distro-settings) to set up `systemd`.

Once systemd is enabled, you can install Postman or other software that relies on it. This will increase the range of tools available for your development environment.

Note that this step is only necessary if you need to run specific applications inside WSL. In many cases, you might be able to run Docker and Postman directly from the Windows host instead.

To enable `systemd`, edit the `wsl.conf` file:

```bash
sudo vim /etc/wsl.conf
```

Add the following lines to the file:

```php
[boot]
systemd=true
```

Afterwards, you need to restart WSL:

```powershell
wsl --shutdown
```

Now, reopen any WSL terminal to start the system with `systemd` support. You can now proceed with installing Postman or any other tools that require `systemd`.

Remember, creating an optimal development environment requires a careful balance between the tools you need and maintaining the system's performance and security. Always remember to update regularly, clean up unnecessary files, and only install trusted software from official sources.

## Conclusion

And there we have it - a comprehensive guide to setting up a WSL2 instance for personal and development use.

Through this guide, you've installed and configured a robust Ubuntu development environment right on your Windows machine, combining the best of both worlds for a unique development experience.

From setting up Zsh and Git to installing various programming languages and databases, you've got a powerhouse at your fingertips. So whether you're coding the next big app or crunching data for insightful analytics, you're well-equipped for the task. Happy coding!

## References & Further Reading

This comprehensive guide to setting up WSL2 with Ubuntu on a Windows host wouldn't be possible without referring to several online resources. The following references have been instrumental in providing the information necessary to create this guide:

1. [Windows Subsystem for Linux in the Microsoft Store](https://devblogs.microsoft.com/commandline/the-windows-subsystem-for-linux-in-the-microsoft-store-is-now-generally-available-on-windows-10-and-11/)
2. [GitHub - ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts)
3. [Chocolatey](https://community.chocolatey.org/packages)
4. [NVM - Node Version Manager](https://github.com/nvm-sh/nvm)
5. [Go Programming Language Download](https://go.dev/dl/go1.20.1.linux-amd64.tar.gz)
6. [Neovim Releases](https://github.com/neovim/neovim/releases)
7. [AstroVim](https://github.com/AstroNvim/AstroNvim)
8. [AskUbuntu: Install libstdc](https://askubuntu.com/questions/726539/sudo-apt-get-install-libstdc)
9. [Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
10. [Systemd Support in WSL](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/#set-the-systemd-flag-set-in-your-wsl-distro-settings)
11. [Setting up WSL 2 for Web Development](https://dev.to/hymanzhan/setting-up-wsl-2-for-web-development-3202)
12. [Web Dev setup in WSL2 Kali Linux 2022 Edition - Part 1: Connecting MariaDB and PostgreSQL database across Windows and WSL2](https://dev.to/yuiltripathee/web-dev-setup-in-wsl2-kali-linux-2022-edition-part-1-connecting-mariadb-and-postgresql-database-across-windows-and-wsl2-o7e)
13. [How to set up a Linux development environment in Windows 10](https://agile.coop/blog/wsl2-development-windows-10-lando/)
14. [Setting up multiple WSL distribution instances | endjin](https://endjin.com/blog/2021/11/setting-up-multiple-wsl-distribution-instances)

Images used in the blog are sourced from the following websites:

- Photo by [Kevin Ku](https://www.pexels.com/photo/data-codes-through-eyeglasses-577585/) on [Pexels](https://pexels.com)
- Photo by [Gabriel Heinzer](https://unsplash.com/@6heinz3r?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/4Mw7nkQDByk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- Photo by [cottonbro studio](https://www.pexels.com/photo/boy-in-white-t-shirt-sitting-on-chair-in-front-of-computer-4709285/) on [Pexels](https://pexels.com)
