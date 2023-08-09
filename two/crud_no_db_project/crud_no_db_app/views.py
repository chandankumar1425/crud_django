from django.shortcuts import render, redirect
from django.http import HttpResponse
data = {
    'name': '',
    'age': '',
    'city': '',
}
def home(request):
    return HttpResponse("Hello world")

def create(request):
    if request.method == 'POST':
        data['name'] = request.POST.get('name')
        data['age'] = request.POST.get('age')
        data['city'] = request.POST.get('city')
        return redirect('/read')
    return render(request, 'create.html')

def read(request):
    return render(request, 'read.html', {'data': data})

def update(request):
    if request.method == 'POST':
        key = request.POST.get('key')
        if key in data:
            data[key] = request.POST.get('value')
        return redirect('/read')
    return render(request, 'update.html')

def delete(request):
    if request.method == 'POST':
        key = request.POST.get('key')
        if key in data:
            del data[key]
        return redirect('/read')
    return render(request, 'delete.html')
