#!/bin/bash
set -e # Exit with nonzero exit code if anything fails
echo ""
echo ""
echo "  >>> Starting Deploy <<<  "
echo ""

# Save some useful information
SOURCE_BRANCH="master"
REPO="git@github.com:wgoodall01/wgoodall01.github.io.git"
COMMIT_AUTHOR_EMAIL="wgoodall01@gmail.com"
SHA=`git rev-parse --verify HEAD`

doCompile () {
    node $TRAVIS_BUILD_DIR/build.js
}

#CD to project root
cd $TRAVIS_BUILD_DIR

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    doCompile
    exit 0
fi

# Get the decrypted deploy key and add it to SSH
chmod 600 $TRAVIS_BUILD_DIR/deploy/deploy_key
eval `ssh-agent -s`
ssh-add $TRAVIS_BUILD_DIR/deploy/deploy_key

# Run compile script
cd $TRAVIS_BUILD_DIR
doCompile

#Set up git repo
cd $TRAVIS_BUILD_DIR/out
git init
#git remote add orgin $REPO

# Now let's go have some fun with the cloned repo
cd $TRAVIS_BUILD_DIR/out

#Set git configuration
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
#if [ -z `git diff --exit-code` ]; then
#    echo "No changes to the output on this push; exiting."
#    exit 0
#fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add origin $REPO
git checkout master
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"
git config --global push.default simple
git push --force --set-upstream origin master

