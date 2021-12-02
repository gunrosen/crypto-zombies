import React from 'react';
import leftFeet from '../assets/left-feet.png';
import rightFeet from '../assets/right-feet.png';
import leftLeg from '../assets/left-leg.png';
import rightLeg from '../assets/right-leg.png';
import leftThigh from '../assets/left-thigh-12x.png';
import rightThigh from '../assets/right-thigh-12x.png';
import leftForeArm from '../assets/left-forearm.png';
import rightForeArm from '../assets/right-forearm.png';
import leftUpperArm from '../assets/left-upper-arm.png';
import rightUpperArm from '../assets/right-upper-arm.png';
import torso from '../assets/torso-12x.png';
import catLegs from '../assets/catlegs.png';

import shift1 from '../assets/shirt-12x.png';
import shift2 from '../assets/shirt-22x.png';
import shift3 from '../assets/shirt-32x.png';
import shift4 from '../assets/shirt-42x.png';
import shift5 from '../assets/shirt-52x.png';
import shift6 from '../assets/shirt-62x.png';

import leftHand from '../assets/left-hand.png';
import rightHand from '../assets/right-hand.png';

import head1 from '../assets/head-12x.png';
import head2 from '../assets/head-22x.png';
import head3 from '../assets/head-32x.png';
import head4 from '../assets/head-42x.png';
import head5 from '../assets/head-52x.png';
import head6 from '../assets/head-62x.png';
import head7 from '../assets/head-72x.png';
import head8 from '../assets/head-82x.png';

import eye1 from '../assets/eyes-12x.png';
import eye2 from '../assets/eyes-22x.png';
import eye3 from '../assets/eyes-32x.png';
import eye4 from '../assets/eyes-42x.png';
import eye5 from '../assets/eyes-52x.png';
import eye6 from '../assets/eyes-62x.png';
import eye7 from '../assets/eyes-72x.png';
import eye8 from '../assets/eyes-82x.png';
import eye9 from '../assets/eyes-92x.png';
import eye10 from '../assets/eyes-102x.png';
import eye11 from '../assets/eyes-112x.png';

import mouth from '../assets/mouth.png';

type ZombieProps = {
    skinColor?: number;
    eyeColor?: number;
    clothesColor?: number;
};

type ZombieShirtProps = {
    clothesColor?: number;
};

type ZombieHeadProps = {
    skinColor?: number;
};

type ZombieEyeProps = {
    eyeColor?: number;
};

const defaultProps: ZombieProps = {
    skinColor: 99,
    eyeColor: 100,
    clothesColor: 200,
};

const ZombieShirt: React.FC<ZombieShirtProps | null> = ({ clothesColor }) => {
    const clothesStyle = {
        filter: `hue-rotate(${clothesColor}deg)`,
    };
    return (
        <>
            <img src={shift1} className="shirt shirt-part-1" alt="" style={clothesStyle} />
            <img src={shift2} className="shirt shirt-part-2" alt="" style={clothesStyle} />
            <img src={shift3} className="shirt shirt-part-3" alt="" style={clothesStyle} />
            <img src={shift4} className="shirt shirt-part-4" alt="" style={clothesStyle} />
            <img src={shift5} className="shirt shirt-part-5" alt="" style={clothesStyle} />
            <img src={shift6} className="shirt shirt-part-6" alt="" style={clothesStyle} />
        </>
    );
};

const ZombieHead: React.FC<ZombieHeadProps | undefined> = ({ skinColor }) => {
    const headStyle = {
        filter: `hue-rotate(${skinColor}deg)`,
    };
    return (
        <>
            <img src={head1} className="head head-part-1" alt="" style={headStyle} />
            <img src={head2} className="head head-part-2" alt="" style={headStyle} />
            <img src={head3} className="head head-part-3" alt="" style={headStyle} />
            <img src={head4} className="head head-part-4" alt="" style={headStyle} />
            <img src={head5} className="head head-part-5" alt="" style={headStyle} />
            <img src={head6} className="head head-part-6" alt="" style={headStyle} />
            <img src={head7} className="head head-part-7" alt="" style={headStyle} />
            <img src={head8} className="head head-part-8" alt="" style={headStyle} />
        </>
    );
};

const ZombieEye: React.FC<ZombieEyeProps | null> = ({ eyeColor }) => {
    const eyeStyle = {
        filter: `hue-rotate(${eyeColor}deg)`,
    };
    return (
        <>
            <img src={eye1} className="eye eye-part-1" alt="" style={eyeStyle} />
            <img src={eye2} className="eye eye-part-2" alt="" style={eyeStyle} />
            <img src={eye3} className="eye eye-part-3" alt="" style={eyeStyle} />
            <img src={eye4} className="eye eye-part-4" alt="" style={eyeStyle} />
            <img src={eye5} className="eye eye-part-5" alt="" style={eyeStyle} />
            <img src={eye6} className="eye eye-part-6" alt="" style={eyeStyle} />
            <img src={eye7} className="eye eye-part-7" alt="" style={eyeStyle} />
            <img src={eye8} className="eye eye-part-8" alt="" style={eyeStyle} />
            <img src={eye9} className="eye eye-part-9" alt="" style={eyeStyle} />
            <img src={eye10} className="eye eye-part-10" alt="" style={eyeStyle} />
            <img src={eye11} className="eye eye-part-11" alt="" style={eyeStyle} />
        </>
    );
};

const Zombie: React.FC<ZombieProps> = ({ skinColor, eyeColor, clothesColor }) => {
    return (
        <div className="zombie-preview">
            <div className="zombie-parts head-visible-2 eye-visible-1 shirt-visible-3">
                <img
                    src={catLegs}
                    className="cat-legs"
                    alt=""
                    style={{ filter: `hue-rotate(${clothesColor}deg)` }}
                />
                <img
                    src={leftFeet}
                    className="left-feet"
                    alt=""
                    style={{ filter: `hue-rotate(${clothesColor}deg)` }}
                />
                <img
                    src={rightFeet}
                    className="right-feet"
                    alt=""
                    style={{ filter: `hue-rotate(${clothesColor}deg)` }}
                />
                <img
                    src={leftLeg}
                    className="left-leg"
                    alt=""
                    style={{ filter: `hue-rotate(${clothesColor}deg)` }}
                />
                <img
                    src={rightLeg}
                    className="right-leg"
                    alt=""
                    style={{ filter: `hue-rotate(${clothesColor}deg)` }}
                />
                <img
                    src={leftThigh}
                    className="left-thigh"
                    alt=""
                    style={{ filter: `hue-rotate(${clothesColor}deg)` }}
                />
                <img
                    src={rightThigh}
                    className="right-thigh"
                    alt=""
                    style={{ filter: `hue-rotate(${clothesColor}deg)` }}
                />

                <img
                    src={rightUpperArm}
                    className="right-upper-arm"
                    alt=""
                    style={{ filter: `hue-rotate(${skinColor}deg)` }}
                />
                <img
                    src={torso}
                    className="torso"
                    alt=""
                    style={{ filter: `hue-rotate(${clothesColor}deg)` }}
                />
                <ZombieShirt clothesColor={clothesColor} />
                <img
                    src={leftUpperArm}
                    className="left-upper-arm"
                    alt=""
                    style={{ filter: `hue-rotate(${skinColor}deg)` }}
                />
                <img
                    src={leftForeArm}
                    className="left-forearm"
                    alt=""
                    style={{ filter: `hue-rotate(${skinColor}deg)` }}
                />
                <img
                    src={rightForeArm}
                    className="right-forearm"
                    alt=""
                    style={{ filter: `hue-rotate(${skinColor}deg)` }}
                />
                <img
                    src={leftHand}
                    className="left-hand"
                    alt=""
                    style={{ filter: `hue-rotate(${skinColor}deg)` }}
                />
                <img
                    src={rightHand}
                    className="right-hand"
                    alt=""
                    style={{ filter: `hue-rotate(${skinColor}deg)` }}
                />

                <ZombieHead skinColor={skinColor} />
                <ZombieEye eyeColor={eyeColor} />

                <img src={mouth} className="mouth" alt="" />
            </div>
        </div>
    );
};
Zombie.defaultProps = defaultProps;
export default Zombie;
