from django.shortcuts import render
import re
import requests
from bs4 import BeautifulSoup
from django.contrib.auth.models import User
from rest_framework import generics, filters
from . serializers import UserSerializer, HotelInfoSerializer, BookmarksSerializer
from rest_framework.permissions import IsAuthenticated ,AllowAny
from .models import BookMarks
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from datetime import datetime, timedelta


# https://www.booking.com/searchresults.html?ss=Dhaka&ssne=Dhaka&ssne_untouched=Dhaka&label=gen173nr-1FCAEoggI46AdIM1gEaBSIAQGYATG4ARnIAQzYAQHoAQH4AQKIAgGoAgO4AtCIz8AGwAIB0gIkM2ZlM2RmM2EtZTJhZS00ZDc0LWEzMzgtMjgxOWQzNjEwMWFh2AIF4AIB&sid=5238ded8ef9f63fbcf9b07261d02a461&aid=304142&lang=en-us&sb=1&src_elem=sb&src=index&dest_id=-2737683&dest_type=city&checkin=2025-06-06&checkout=2025-06-07&group_adults=2&no_rooms=1&group_children=0

# Create your views here.
class CreateNewUser(generics.CreateAPIView):
    #getting all the data to ensure not creating copy  user
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [AllowAny]

class CreateNewBookmark(generics.ListCreateAPIView):
    serializer_class = BookmarksSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # return BookMarks.objects.all()
        return BookMarks.objects.filter(customer=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            # serializer.save()
            serializer.save(customer=self.request.user)
        else:
            print(serializer.errors)

class BookmarkDelete(generics.DestroyAPIView):
    serializer_class = BookmarksSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return BookMarks.objects.filter(customer=user)

class Hotel:
    def __init__(self, rid, name, description, price, rating, url):
        self.rid = rid
        self.name = name
        self.description = description
        self.price = price
        self.rating = rating
        self.url = url

    def to_dict(self):
        return {
            'rid' : self.rid,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'rating': self.rating,
            'url': self.url
        }

ckin = (datetime.now() + timedelta(days=3)).strftime('%Y-%m-%d')
ckot = (datetime.now() + timedelta(days=5)).strftime('%Y-%m-%d')

def home (request):
    hotel_info_list = []
    if 'city' in request.GET:
        product = request.GET.get('city')
        html_content = get_content(product)
        soup = BeautifulSoup(html_content, 'html.parser')
    hotel_items = soup.find_all()
    return render(request, 'home.html')


def get_content(location, checkin="2025-08-08", checkout="2025-08-12"):
    USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
    LANGUAGE = "en-US, en; q=0.5"
    session = requests.Session()
    session.headers['User-Agent'] = USER_AGENT
    session.headers['Accept-Language'] = LANGUAGE
    session.headers['Content-Language'] = LANGUAGE
    url = (
        f'https://www.booking.com/searchresults.html'
        f'?ss={location}'
        f'&checkin={checkin}'
        f'&checkout={checkout}'
        f'&group_adults=1'
        f'&no_rooms=1'
        f'&group_children=0'
    )
    html_content = session.get(url)
    return html_content


def get_rating(hotel_items):
    rating_div = hotel_items.find('div', attrs={'aria-label': True, 'class': 'ebc566407a'})
    if rating_div:
        rating = rating_div.get('aria-label')  # Will return something like "4 out of 5"
        # To get just the numeric value
        return int(rating.split()[0]) 
    return 0


def get_price(item):
    price_tag = item.find('span', class_="b87c397a13 f2f358d1de ab607752a2")
    price_text = price_tag.text
    numbers = re.findall(r'\d+', price_text)
    if numbers:
        return int(''.join(numbers))
    return 0



def get_data(location, checkin, checkout):
    hotel_info_list = []
    html_content = get_content(location, checkin, checkout)
    soup = BeautifulSoup(html_content.content, 'html.parser')
    hotel_info_list = soup.find_all('div', class_='aa97d6032f a7f9affbc2')
    c = 1
    hotel_infos = []
    for item in hotel_info_list:
        rid = c
        name = (item.find('div', class_="b87c397a13 a3e0b4ffd1").text)
        description = (item.find('div', class_="fff1944c52").text)
        price = get_price(item)
        rating = get_rating(item)
        url = (item.find('a', class_="de576f5064 bef8628e61 a677945080 e0d8514d4d")).get('href')
        hotel_info = Hotel(rid, name, description, price, rating, url)
        c+=1


        hotel_infos.append(hotel_info)
    return hotel_infos


@api_view(['GET'])
def searchLocation(request):
    try:
        location = request.query_params.get('location')
        if not location:
            return Response(
                {"error": "Location parameter is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get hotel data using the existing get_data function
        hotel_infos = get_data(location, ckin, ckot)
        
        # Convert Hotel objects to dictionaries
        hotel_dicts = [hotel.to_dict() for hotel in hotel_infos]
        
        # Serialize the list of dictionaries
        serializer = HotelInfoSerializer(data=hotel_dicts, many=True)
        
        if serializer.is_valid():
            return Response(serializer.validated_data)
        print("Serializer errors:", serializer.errors)  # Debug print
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        print("Exception:", str(e))  # Debug print
        return Response(
            {"error": f"Failed to fetch hotel data: {str(e)}"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


