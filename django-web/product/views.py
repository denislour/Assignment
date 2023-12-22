from django.http import HttpRequest
from django.shortcuts import render


def fetch_user(request: HttpRequest):
    return render(request, 'product/fetch_user.html')
