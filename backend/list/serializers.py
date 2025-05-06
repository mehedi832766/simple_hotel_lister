from rest_framework import serializers
from django.contrib.auth.models import User
from . models import BookMarks

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        #not returning the password
        extra_kwargs = {"password":{"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class BookmarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookMarks
        fields = ["id","name", "description", "price", "rating", "url", "customer"]
        extra_kwargs = {"customer":{"read_only": True}}       

class HotelInfoSerializer(serializers.Serializer):
    rid = serializers.CharField()
    name = serializers.CharField()
    description = serializers.CharField()
    price = serializers.IntegerField()
    rating = serializers.IntegerField()
    url = serializers.URLField()