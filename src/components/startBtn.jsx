export const StartBtn = () =>{
    return(
        <>
            <button className='play' onClick={(e) => {e.preventDefault();window.location.href='/games';}}>العب</button>
        </>
    )
}