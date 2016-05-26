# coding: utf-8
import os
from fabric.api import run, env, cd, roles, lcd
from fabric.operations import local as lrun, run, sudo

env.shell = "/bin/bash -l -i -c"
env.forward_agent = True
env.roledefs = {
    'dev2': ['dev2@dev.trendever.com'],
}

HOME = "~/"
PROJECT_PATH = HOME + "soso_test/"

def git_pull():
    with cd(PROJECT_PATH):
        run("git pull origin master")
        print("Git pull: Success")


def install_req():
    with cd(PROJECT_PATH):
        run("npm install")
        print("Install requirements: Success")


def build():
    with cd(PROJECT_PATH):
        run("npm run build")
        print("Build static: Success")

def update():
    git_pull()
    build()


def localhost():
    global run
    global sudo
    global lrun
    global lcd
    global cd
    run = sudo = lrun
    cd = lcd
    env.host = ['localhost']


def test():
    print(env.user)
    print(env.roles)
    print("test")
