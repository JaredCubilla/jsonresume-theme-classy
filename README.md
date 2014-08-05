#jsonresume-theme-classy

An uber-classy theme for JSONResume.

## Usage

To first get started with this JSONResume theme, you'll need to have the JSONResume CLI installed. If you haven't already install it with `npm install -g resume-cli`. If this doesn't work, try `sudo npm install -g resume-cli`.

After this, you can get your resume.json ready by typing `resume init`. After hitting enter, your resume will be initialized and you can edit it and fill in the neccessary fields. Check out [the official resume-schema repository](https://github.com/jsonresume/resume-schema) for more information on filling these fields.

When you are finished with your resume, you may test it by yet again opening the command line and typing `resume serve --theme classy` to see how it looks with this theme. You can replace the word `classy` with other theme names too.

If you want a local copy of your resume, type in `resume export resumeName --theme classy`, and replace `resumeName` with the desired filename. You can export it in pdf and txt using the `--format` flag, like so:

```
resume export resume --format pdf --theme classy
```

However, if you wish to export it to the JSONResume Registry, use the command `resume publish` instead.

More details about the CLI and it's commands are available [here](https://github.com/jsonresume/resume-cli).

## Tips

If you do not include the publications array in your resume.json, no publications section will appear. The same goes for skills, languages, references, work, education, your summary... the list goes on and on. **Every section is optional, and if you do not fill a section with any information, it will be left blank.**

If you find any other problems with this theme in specified, do feel free to leave an issue. Thanks.



## Colophon

Thanks to the wonderful [Font Awesome](https://fontawesome.io) for their free-to-use icon font, and a big thank you to the JSONResume theme for their wonderful idea and helping me with a few issues on my part.
