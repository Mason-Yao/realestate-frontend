export const convertToHTML = (content: string) => {
  return `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8" />
                        <link href="https://cdn.quilljs.com/1.3.6/quill.core.css" rel="stylesheet">
                    </head>
                    <body>
                        <div class="ql-editor" style="white-space: nowrap">
                        ${content ? content : ""}
                        </div>
                    </body>
                </html>`
}
