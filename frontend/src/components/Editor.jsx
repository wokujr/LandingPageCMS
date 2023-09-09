import React, { useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

export default function EditorComponent() {
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        const initializeEditor = async () => {
            const csrfToken = document.querySelector("meta[name='csrf-token']").content;

            const initialContent = getInitialContent();
            const editorInstance = new EditorJS({
                holder: 'editor-container', // Make sure to set the element id you want to render the editor into
                data: initialContent,
                tools: {
                    header: {
                        class: Header,
                    },
                    list: {
                        class: List,
                    },
                    paragraph: {
                        class: Paragraph,
                        config: {
                            inlineToolbar: true,
                        },
                    },
                    code: CodeTool,
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: '/articles/upload_image',
                            },
                            additionalRequestHeaders: {
                                'X-CSRF-Token': csrfToken,
                            },
                        },
                    },
                },
            });

            setEditor(editorInstance);

            // Add a submit event listener
            document.getElementById('about-form').addEventListener('submit', saveEditorData);

            async function saveEditorData(event) {
                event.preventDefault();

                const outputData = await editorInstance.save();
                const hiddenInput = document.getElementById('article_content_hidden');
                hiddenInput.value = JSON.stringify(outputData);

                // Continue with your form submission logic here
                const articleForm = event.target;
                articleForm.submit();
            }

            function getInitialContent() {
                const hiddenContentField = document.getElementById('article_content_hidden');
                if (hiddenContentField && hiddenContentField.value) {
                    return JSON.parse(hiddenContentField.value);
                }
                return {};
            }
        };

        initializeEditor();
    }, []);

    return (
        <div>
            <form id="about-form'">
                <div id="editor-container"></div>
                <input type="hidden" id="article_content_hidden" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
