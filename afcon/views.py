# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .forms import PostForm
from .models import Post
from django.contrib import messages
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render, get_object_or_404, redirect

def imap(request):
	form = PostForm(request.POST or None,request.FILES or None)
	if form.is_valid():
		instance = form.save(commit=False)
		instance.save()
		messages.success(request,"Thanks For Voting!")
		queryset_list = Post.objects.all()
		context = {"form":form,"queryset_list":queryset_list}
		return render(request,"index2.html",context)		

	queryset_list = Post.objects.all()

	context = {"form":form,"queryset_list":queryset_list}


	return render(request,"index2.html",context)