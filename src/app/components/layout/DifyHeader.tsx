/**
 * Dify Header
 * @returns JSX.Element
 */
const DifyHeader = () => {
    return (
        <div className="bg-[#000000] bg-opacity-50 backdrop-blur-lg p-6">
            <h1 className="text-3xl font-crimson-text text-center text-[#e0e0e0] tracking-wide">
                AI チャットボット
                <span className="ml-2 text-[#00ff9d]">●</span>
            </h1>
        </div>
    );
};

export default DifyHeader;
