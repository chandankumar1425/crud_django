from django.contrib import admin
from django.urls import path, include
# from . import views

urlpatterns = [
    # path('',views.home,name='home'),
    path('admin/', admin.site.urls),
    path('', include('crud_no_db_app.urls')),
]
