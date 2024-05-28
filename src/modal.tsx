export default function Modal(props: {moves: number}){
    const {moves} = props;
    return(<div className="fixed inset-10 bg-blue-200 bg-opacity-0 flex items-center justify-center z-10">
    <div className="bg-white p-8 rounded shadow-lg text-center">
        <p>Congratulations!</p>
        <p>You've cleared the game in {moves} moves!</p>
        <button onClick={()=>{window.location.reload()}}className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            다시하기
        </button>
    </div>
  </div>)
}