export default function Button({ buttonName, buttonType, onClickHandler }) {
    return (
        <div>
            <button type={buttonType} onClick={onClickHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {buttonName}
            </button>
        </div>
    )
}