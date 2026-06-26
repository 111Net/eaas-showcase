#!/bin/bash

echo "========== EAAS SHOWCASE =========="

echo
echo "Project Structure"
tree -L 2 /opt/eaas/eaas-showcase

echo
echo "Backend Health"
curl -s http://127.0.0.1:8000/health

echo
echo
echo "Frontend Files"

ls -lah /opt/eaas/eaas-showcase/frontend

echo
echo "Verification Complete"
