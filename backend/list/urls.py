from django.urls import path, include
from . import views

urlpatterns = [
    path('hotels/bookmarks/',views.CreateNewBookmark.as_view(), name = "bookmark-list"),
    path("hotels/bookmarks/delete/<int:pk>/", views.BookmarkDelete.as_view(), name = "bookmark-delete"),
    path('hotels/search/', views.searchLocation, name = 'searchcity'),
    
]
