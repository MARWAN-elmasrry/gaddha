import { useState } from "react";
import GameCate from "./gamecate/gamecate";
import Kgame from "./keepgame/kgame";
import "./mgStyle.css";

const Game = () => {
    const [activeTab, setActiveTab] = useState('games');
    const [isFlipping, setIsFlipping] = useState(false);

    const handleTabClick = (tab, event) => {
        event.preventDefault();
        if (tab !== activeTab) {
            setIsFlipping(true);
            setTimeout(() => {
                setActiveTab(tab);
                setTimeout(() => setIsFlipping(false), 50);
            }, 150);
        }
    };

    return (
        <>
            <div className="game">
                <div className="container">
                    <div className="game-cont">
                        <div className="g-links">
                            <div className="g-link">
                                <a 
                                    className={activeTab === 'games' ? 'g-active' : ''} 
                                    href="#"
                                    onClick={(e) => handleTabClick('games', e)}>
                                    ألعابي</a>
                                <a 
                                    className={activeTab === 'categories' ? 'g-active' : ''} 
                                    href="#"
                                    onClick={(e) => handleTabClick('categories', e)}>الفئات
                                </a>
                            </div>
                        </div>
                        <div className={`card-flip-container ${isFlipping ? 'flipping' : ''}`}>
                            <div className="card-content">
                                {activeTab === 'games' && <Kgame />}
                                {activeTab === 'categories' && <GameCate />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Game;