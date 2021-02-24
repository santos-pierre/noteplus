import marked from 'marked';

type MarkdownPreviewProps = {
    content: string;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
    const renderMarkdown = () => {
        marked.setOptions({
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

    return <div className="prose p-3" dangerouslySetInnerHTML={{ __html: renderMarkdown() }}></div>;
};

export default MarkdownPreview;
