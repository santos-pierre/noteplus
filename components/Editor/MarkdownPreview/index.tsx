import marked from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-bash';

type MarkdownPreviewProps = {
    content: string;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
    const renderMarkdown = () => {
        marked.setOptions({
            highlight: function (code, lang) {
                if (Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                } else {
                    return code;
                }
            },
            pedantic: false,
            gfm: true,
            breaks: true,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false,
        });
        return marked(content);
    };

    return (
        <div
            className="h-full px-8 py-3 prose prose-lg"
            dangerouslySetInnerHTML={{ __html: renderMarkdown() }}
        ></div>
    );
};

export default MarkdownPreview;
