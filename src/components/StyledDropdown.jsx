
import styled from 'styled-components';

const StyledDropdown = () => {
    return (
        <StyledWrapper>
            <div className="menu !text-[#B0AEA5]">
                <div className="item">
                    <a href="#" className="link bg-[#1d282c] ">
                        <span> Sort By </span>
                        <svg viewBox="0 0 360 360" xmlSpace="preserve">
                            <g id="SVGRepo_iconCarrier">
                                <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
                            </g>
                        </svg>
                    </a>
                    <div className="submenu">
                        <div className="submenu-item">
                            <a href="#" className="submenu-link"> Name </a>
                        </div>
                        <div className="submenu-item">
                            <a href="#" className="submenu-link"> Next Filing </a>
                        </div>
                        <div className="submenu-item">
                            <a href="#" className="submenu-link"> Status </a>
                        </div>
                        <div className="submenu-item">
                            <a href="#" className="submenu-link"> Type </a>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .menu {
    font-size: 16px;
    line-height: 1.6;
    width: fit-content;
    display: flex;
    list-style: none;
  }

  .menu a {
    text-decoration: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .menu .link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 8px 36px;
    border-radius: 9px;
    overflow: hidden;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .link::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0a3cff;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .link svg {
    width: 14px;
    height: 14px;
    fill: #B0AEA5;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .item {
    position: relative;
  }

  .menu .item .submenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 100%;
    border-radius: 0 0 16px 16px;
    left: 0;
    width: 100%;
    overflow: hidden;
    border: 1px solid #B0AEA5;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-12px);
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
    pointer-events: none;
    list-style: none;
  }

  .menu .item:hover .submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
    border-top: transparent;
    border-color: #B0AEA5;
  }

  .menu .item:hover .link {
    border-radius: 16px 16px 0 0;
  }

  .menu .item:hover .link::after {
    transform: scaleX(1);
    transform-origin: right;
  }

  .menu .item:hover .link svg {
    transform: rotate(-180deg);
  }

  .submenu .submenu-item {
    width: 100%;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link {
    display: block;
    padding: 12px 24px;
    width: 100%;
    position: relative;
    text-align: center;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-item:last-child .submenu-link {
    border-bottom: none;
  }

  .submenu .submenu-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    width: 100%;
    height: 100%;
    background-color: #B0AEA5;
    z-index: -1;
    transform-origin: left;
    transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link:hover:before {
    transform: scaleX(1);
    transform-origin: right;
  }

  .submenu .submenu-link:hover {
    color: #000;
  }`;

export default StyledDropdown;
