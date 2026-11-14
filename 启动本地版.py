#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
集藏本体论 · 本地版启动器

双击本文件，或在该目录下执行：
    python3 启动本地版.py

脚本会在你本机启动一个仅本机可见的网站服务，并自动打开浏览器。
关闭命令行窗口即可停止服务。
"""
import http.server
import socketserver
import os
import socket
import threading
import webbrowser

ROOT = os.path.dirname(os.path.abspath(__file__))


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, *args):
        pass


def pick_port(start=8000):
    for p in range(start, start + 100):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(("127.0.0.1", p)) != 0:
                return p
    return start


def main():
    port = pick_port()
    url = "http://127.0.0.1:{}/index.html".format(port)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", port), QuietHandler) as httpd:
        print("=" * 52)
        print("  集藏本体论 · 本地版已启动")
        print("  地址：{}".format(url))
        print("  关闭本窗口即可停止服务")
        print("=" * 52)
        threading.Timer(1.0, lambda: webbrowser.open(url)).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n已停止。")


if __name__ == "__main__":
    main()
