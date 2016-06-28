#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Save some useful information
SOURCE_BRANCH="master"

TARGET_BRANCH="master"
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


#Clone master from target repo (user pages) into out/
# Create a new empty branch if master doesn't exist yet (for any reason)
cd $TRAVIS_BUILD_DIR
git clone $REPO out
cd out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd $TRAVIS_BUILD_DIR

# Clean out existing contents
rm -rf $TRAVIS_BUILD_DIR/out/**/* || exit 0

# Run compile script
cd $TRAVIS_BUILD_DIR
doCompile

# Now let's go have some fun with the cloned repo
cd $TRAVIS_BUILD_DIR/out

#Set git configuration

git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if [ -z `git diff --exit-code` ]; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Get the decrypted deploy key

chmod 600 $TRAVIS_BUILD_DIR/deploy/deploy_key
eval `ssh-agent -s`
ssh-add $TRAVIS_BUILD_DIR/deploy/deploy_key

# Now that we're all set up, we can push.
git push $REPO $TARGET_BRANCH