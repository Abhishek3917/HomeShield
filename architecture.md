# HomeShield Architecture

## Goal

Provide secure remote access to a home network while filtering DNS traffic through AdGuard Home.

---

## Components

### WireGuard

Responsible for:

- VPN connections
- Device authentication
- Encrypted network tunnel

---

### AdGuard Home

Responsible for:

- DNS resolution
- Ad blocking
- Malware domain filtering
- DNS statistics

---

### Docker

Each service runs inside its own container.

Benefits:

- Easy deployment
- Service isolation
- Portability
- Reproducibility

---

## Architecture Diagram

```text
             Internet
                  │
           Private IP
                  │
             Home Router
                  │
        UDP Port 51820 Forward
                  │
          ┌───────────────┐
          │   WireGuard   │
          └───────────────┘
                  │
          VPN Private Network
                  │
          ┌───────────────┐
          │ AdGuard Home  │
          └───────────────┘
```

---

