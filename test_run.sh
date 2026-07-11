#!/bin/bash
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "=== Running Production Infrastructure Health Check ==="

# 1. Test if containers are running
if [ "$(sudo docker container inspect -f '{{.State.Running}}' wg-easy)" = "true" ]; then
    echo -e "[${GREEN}PASS${NC}] WireGuard container is up and running."
else
    echo -e "[${RED}FAIL${NC}] WireGuard container is down."
fi

# 2. Validate internal private network routing
if sudo docker exec wg-easy ping -c 1 10.8.0.3 &> /dev/null; then
    echo -e "[${GREEN}PASS${NC}] WireGuard can route internal traffic directly to the AdBlocker."
else
    echo -e "[${RED}FAIL${NC}] Internal routing broken between containers."
fi

echo "======================================================"