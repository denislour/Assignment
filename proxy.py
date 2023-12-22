from typing import Type
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.request


class ProxyHTTPRequestHandler(BaseHTTPRequestHandler):
    express_api_url = "http://localhost:3000"

    def do_GET(self):
        self.proxy_request()

    def do_POST(self):
        self.proxy_request()

    def do_PUT(self):
        self.proxy_request()

    def do_DELETE(self):
        self.proxy_request()

    def proxy_request(self):
        target_url = self.express_api_url + self.path
        content_length = int(self.headers.get('content-length', 0))
        body = self.rfile.read(content_length) if content_length else None

        req = urllib.request.Request(
            target_url, data=body, method=self.command)
        for header, value in self.headers.items():
            req.add_header(header, value)

        with urllib.request.urlopen(req) as response:
            self.send_response(response.status)
            for header, value in response.getheaders():
                self.send_header(header, value)
            self.end_headers()
            self.wfile.write(response.read())


def run(
    server_class: Type[HTTPServer] = HTTPServer,
    handler_class: Type[BaseHTTPRequestHandler] = ProxyHTTPRequestHandler,
    port: int = 5000
):

    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting proxy server on port {port}...')
    httpd.serve_forever()


if __name__ == '__main__':
    run()
