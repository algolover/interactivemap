# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Post(models.Model):
	fact = models.CharField(max_length=50,default="Test")

	def __unicode__(self):
		return self.fact
	def __str__(self):
		return self.fact


