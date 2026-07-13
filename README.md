# HomeShield

> A self-hosted VPN and DNS filtering platform built with WireGuard and AdGuard Home.

HomeShield is an open-source project that aims to simplify secure remote access to a home network while providing network-wide DNS filtering. The long-term goal is to build a production-ready platform similar in concept to Proton VPN + NextDNS, but fully self-hosted.

> **Current Version:** v1.0.0 (Foundation)

---

## Features

### ✅ Implemented

- WireGuard VPN
- AdGuard Home DNS filtering
- Docker Compose deployment
- Persistent container storage
- Secure remote access to home network
## Architecture

```text
                    Internet
                        │
                 private IP 
                        │
                     Router
                        │
             Port Forward UDP 51820
                        │
                ┌────────────────┐
                │   WireGuard    │
                └────────────────┘
                        │
                 VPN Private Network
                        │
                ┌────────────────┐
                │ AdGuard Home   │
                └────────────────┘
```

---

## Tech Stack

- WireGuard
- AdGuard Home
- Docker
- Docker Compose
- Linux

---

## Quick Start

Clone the repository.

```bash
git clone https://github.com/Abhishek3917/HomeShield.git

cd HomeShield
```
```bash
cp .env.example .env
```
Start the services.

```bash
docker compose up -d
```

Check running containers.

```bash
docker ps
```
