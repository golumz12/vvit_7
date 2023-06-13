from django.shortcuts import render
from .models import Article
from django.http import Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, login
from django.shortcuts import redirect


def archive(request):
    return render(request, 'archive.html', {"posts": Article.objects.all()})


def get_article(request, article_id):
    try:
        post = Article.objects.get(id=article_id)
        return render(request, 'article.html', {"post": post})
    except Article.DoesNotExist:
        raise Http404


def create_article(request):
    if not request.user.is_anonymous:
        if request.method == "POST":
            form = {'text': request.POST['text'],
                    'title': request.POST['title']}
            if form['text'] and form['title']:
                article = Article.objects.create(text=form['text'],
                                                 title=form['title'],
                                                 author=request.user)
                return get_article(request, article_id=article.id)
            else:
                form['errors'] = u"Not all values are filled"
                return render(request, 'create_article.html',
                              {'form': form})
        else:
            return render(request, 'create_article.html', {})
    else:
        raise Http404


def sign_up_user(request):
    if request.user.is_authenticated:
        return redirect('/')
    content = {
            'title': 'Registration',
            'header': 'Registration',
            'email_field': True,
            'action': 'Sign up',
            }
    if request.method == 'POST':
        args = request.POST
        form = {}
        if args['username'] and args['email'] and args['password']:
            if all(args['username'] != x.username and args['email'] != x.email
                   for x in User.objects.all()):
                User.objects.create_user(username=args['username'],
                                         email=args['email'],
                                         password=args['password'])
                return archive(request)
            form = {'errors': u"User with this name or email already exists"}
        else:
            form = {'errors': u"Not all values are filled"}
        return render(request, 'reglog.html',
                      {'content': content, 'form': form})
    else:
        return render(request, 'reglog.html',
                      {'content': content})


def sign_in_user(request):
    if request.user.is_authenticated:
        return redirect('/')
    content = {
            'title': 'Log in',
            'header': 'Log in',
            'email_field': False,
            'action': 'Sign in'
            }
    if request.method == 'POST':
        args = request.POST
        if args['username'] and args['password']:
            user = authenticate(request, username=args['username'],
                                password=args['password'])
            if not user:
                form = {'errors': u"Incorrect values"}
                return render(request, 'reglog.html',
                              {'content': content, 'form': form})
            login(request, user)
            return redirect('/')
        else:
            form = {'errors': u"Not all values are filled"}
            return render(request, 'reglog.html',
                          {'content': content, 'form': form})
    else:
        return render(request, 'reglog.html', {'content': content})


def sign_out_user(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect('/')
