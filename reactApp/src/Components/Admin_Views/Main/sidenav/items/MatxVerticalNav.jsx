import { Box, ButtonBase, Icon, styled } from '@mui/material';
import useSettings from '../../../../../Setteing/useSettings';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Paragraph, Span } from '../../../../../Setteing/Typography';
import MatxVerticalNavExpansionPanel from './MatxVerticalNavExpansionPanel';
import ProfileIndex from '../profile/index';
import useAuth from '../../../../../Auth/useAuth';
/*
サイドバーのアイテム表示
*/
const ListLabel = styled(Paragraph)(({ theme, mode }) => ({
  fontSize: '12px',
  marginTop: '20px',
  marginLeft: '15px',
  marginBottom: '10px',
  textTransform: 'uppercase',
  display: mode === 'compact' && 'none',
  color: theme.palette.text.secondary,
}));

const ExtAndIntCommon = {
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  height: 44,
  whiteSpace: 'pre',
  marginBottom: '8px',
  marginTop: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important',
  },
  '& .icon': {
    fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'middle',
  }, 
  '&.navItemActive': {
    color: 'black',
  },
};
const ExternalLink = styled('a')(({ theme }) => ({
  ...ExtAndIntCommon,
  color: theme.palette.text.primary,
}));

const InternalLink = styled(Box)(({ theme }) => ({

  '& a': {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary,
  },
}));

const StyledText = styled(Span)(({ mode }) => ({
  fontSize: '0.875rem',
  paddingLeft: '0.8rem',
  display: mode === 'compact' && 'none',
}));
const StyledLogo = styled(Span)(({ mode }) => ({
  width: '100%',
  textAlign: 'center',
  fontFamily:' auto',
  fontWeight: '900',
  fontSize: '28px',
}));


const BulletIcon = styled('div')(({ theme }) => ({
  padding: '2px',
  marginLeft: '24px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '300px',
  background: theme.palette.text.primary,
}));

const BadgeValue = styled('div')(() => ({
  padding: '1px 8px',
  overflow: 'hidden',
  borderRadius: '300px',
}));

const MatxVerticalNav = ({ items }) => {
  const { settings } = useSettings();
  const {isGuest} = useAuth();
  const { mode } = settings.leftSidebar;

  const renderLevels = (data) => {
    return data.map((item, index) => {
      if(item.notlogin == isGuest){
         return;
      }

             if (item.type === 'label')
                    return (
                      <ListLabel key={index} mode={mode} className="sidenavHoverShow">
                        {item.label}
                      </ListLabel>
                    );

                  //隠し要素 
                  if (item.children) {
                    return (
                      <MatxVerticalNavExpansionPanel mode={mode} item={item} key={index}>
                        {renderLevels(item.children)}
                      </MatxVerticalNavExpansionPanel>
                    );

                  }
                  //外部リンク
                  else if (item.type === 'extLink') 
                  {
                    return (
                      <InternalLink InternalLink key={index}>
                        <ButtonBase key={item.name} name="child" sx={{ width: '100%' }}>
                          {(() => {
                            if (item.icon) {
                              return <Icon className="icon">{item.icon}</Icon>;
                            } else {
                              return <span className="item-icon icon-text">{item.iconText}</span>;
                            }
                          })()}
                          <StyledText mode={mode} className="sidenavHoverShow">
                            {item.name}
                          </StyledText>
                          <Box mx="auto"></Box>
                          {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
                        </ButtonBase>
                      </InternalLink>

                    );
                  } 
                  else if (item.type === 'logo') {
                    return(
                      <InternalLink key={index}> 
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                            : `${mode === 'compact' && 'compactNavItem'}`
                        }
                      > 
                      <StyledLogo > MEMO. CLIPS</StyledLogo>
                      </NavLink>
                    </InternalLink>  
                    )
                  }
                  else if (item.type === 'profile') {
                    return(
                            <ProfileIndex/> 
                    )
                  } else {
                    return (
                      <InternalLink key={index}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            isActive
                              ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                              : `${mode === 'compact' && 'compactNavItem'}`
                          }
                        >
                          <ButtonBase key={item.name} name="child" sx={{ width: '100%' }}>
                            {item?.icon ? (
                              <Icon className="icon" sx={{ width: 36 }}>
                                {item.icon}
                              </Icon>
                            ) : (
                              <Fragment>
                                <BulletIcon
                                  className={`nav-bullet`}
                                  sx={{ display: mode === 'compact' && 'none' }}
                                />
                                <Box
                                  className="nav-bullet-text"
                                  sx={{
                                    ml: '20px',
                                    fontSize: '11px',
                                    display: mode !== 'compact' && 'none',
                                  }}
                                >
                                  {item.iconText}
                                </Box>
                              </Fragment>
                            )}
                            
                            <StyledText mode={mode} className="sidenavHoverShow">
                              {item.name}
                            </StyledText>

                            <Box mx="auto" />

                            {item.badge && (
                              <BadgeValue className="sidenavHoverShow">{item.badge.value}</BadgeValue>
                            )}
                          </ButtonBase>
                        </NavLink>
                      </InternalLink>
                    );
                  }        

    });
  };

  return <div className="navigation">{renderLevels(items)}</div>;
};

export default React.memo(MatxVerticalNav);
