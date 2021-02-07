const LogoPlaceholder = () => {
    return (
        <div className="flex items-center flex-shrink-0 px-4">
            <img
                className="hidden w-auto h-8 dark:block"
                src="/noteplus-dark.svg"
                alt="noteplus"
            />
            <img
                className="block w-auto h-8 dark:hidden"
                src="/noteplus-light.svg"
                alt="noteplus"
            />
        </div>
    );
};

export default LogoPlaceholder;
