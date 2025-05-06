from django.contrib import admin
from django.urls import path, include
from list.views import CreateNewUser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 


urlpatterns = [
    path('admin/', admin.site.urls),
    path("list/user/register/", CreateNewUser.as_view(), name="register"),
    path("list/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("list/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("list-auth", include("rest_framework.urls")),
    path('list/',include('list.urls'))
]
