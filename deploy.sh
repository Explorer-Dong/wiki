git push

mkdocs build
ossutil rm -r oss://wiki-web-shanghai/ -f
ossutil cp oss://public-assets-shanghai/files/BingSiteAuth.xml oss://wiki-web-shanghai/
ossutil cp -r ./site/ oss://wiki-web-shanghai/
