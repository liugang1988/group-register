set -e

# read project info 
NAME='runedu-group-register'
VERSION=`sed -n 's/.*"version":\ "\(.*\)",/\1/p' package.json`

# see git status
git pull && git status

echo
echo
echo
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 REPLY
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Enter release message: "
    read MESSAGE
    echo
    echo
    echo

    # create a tag
    echo "Creating a tag ..."
    TAGNAME="${NAME}_v${VERSION}_"`date +%Y%m%d%H%M`
    git tag -a ${TAGNAME} -m "[tag] $MESSAGE"
    echo "New tag: $TAGNAME"
    echo
    echo
    echo

    # publish
    echo "Releasing $TAGNAME ..."
    git push origin ${TAGNAME}
    echo
    echo
    echo
    echo "Released"
fi
