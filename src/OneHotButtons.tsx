import { useSelect } from '@wordpress/data';
import * as React from 'react';
// import type { CSSProperties } from 'react';
import BrushIcon from '@mui/icons-material/Brush';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
// import ToggleButton from '@mui/material/ToggleButton';
import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import {ToggleButtonGroup, ToggleButton, Text} from '@react-spectrum/s2/ToggleButtonGroup';
import { createTheme, alpha, getContrastRatio, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    presetSelect: Palette['primary'];
  }

  interface PaletteOptions {
    presetSelect?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/ToggleButtonGroup' {
  interface ButtonPropsColorOverrides {
    presetSelect: true;
  }
}

const violetBase = '#7F00FF';
const a22 = '#00ffc3';
const violetMain = alpha(violetBase, 0.7);


const theme = createTheme({
  palette: {
    primary: {
      main: a22,
      light: alpha(a22, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    secondary: {
      main: violetBase,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },

    // text: {
    //   primary: alpha(a27, 0.08),
    //   secondary: alpha(a25, 0.5),
    //   disabled: alpha(a26, 0.7)

    // },

    action: {
      // active: alpha(a23, 0.9),
      // hover: alpha(a23, 0.04),
      hoverOpacity: 0.12,
      // selected: alpha(a24, 0.08),
      selectedOpacity: 0.5,
      // disabled: alpha(a25, 0.5),
      // disabledBackground: alpha(a26, 0.7),
      disabledOpacity: 0.5,
      // focus: alpha(a27, 0.12),
      focusOpacity: 0.5,
      activatedOpacity: 0.5
    },

    background: {
      paper: '#121212',
      default: '#121212'
    }

  },
});


export default function VerticalToggleButtons(props) { 
  const [view, setView] = React.useState(props.preset);


  const handleChange = async (_: React.MouseEvent<HTMLElement>, nextView: string) => {
        if (!nextView) return; // MUI returns null if you click the already-selected button
        setView(nextView);

        const form = new FormData();
        form.append('action', 'wp_minimizer_set_preset');
        form.append('nonce', window.minimizer.nonce);
        form.append('value', nextView);

        const response = await fetch(window.minimizer.ajaxUrl, { method: 'POST', body: form });
        const result = await response.json();

        //Now checks for response
        if (result.success) {

          
          const preset = window.minimizer.presets[nextView];

          //Going from a more restrictive to less requires this part
          wp.blocks.getBlockTypes()
              .forEach( block => {
                  wp.blocks.unregisterBlockType( block.name )
                  wp.blocks.registerBlockType( block.name, {
                      ...block,
                      supports: { ...block.supports, inserter: true }
                  });
          });
          
          const ifPresetNotFull = preset != true; 
          if (ifPresetNotFull) {
              wp.blocks.getBlockTypes()
                  .filter( block => ! preset.includes( block.name ))
                  .forEach( block => {
                      wp.blocks.unregisterBlockType( block.name )
                      wp.blocks.registerBlockType( block.name, {
                          ...block,
                          supports: { ...block.supports, inserter: false }
                      });
              });
          }
        }
  };

  const buttonDiv : React.CSSProperties = {
      width: '100%',
      padding: '0px 0px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    };

  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
        style={{width: '100%'}}
      >
        <ToggleButton value="slim" aria-label="slim" color="secondary">
          <div style={buttonDiv}>
            <BrushIcon style={{width: '10%', fontSize: '1.75rem', color: view == "slim" ? 'white' : '' }}/>
            <div style={{width: '90%', fontSize: '1rem', paddingLeft: '5%', display: 'flex', textTransform: 'capitalize', color:  view == "slim" ? 'white' : ''}}>Slim</div>
          </div>
        </ToggleButton>
        <ToggleButton value="medium" aria-label="medium" color="secondary">
          <div style={buttonDiv}>
            <ViewQuiltIcon style={{width: '10%', fontSize: '1.75rem', color: view == "medium" ? 'white' : ''}}/>
            <div style={{width: '90%', fontSize: '1rem', paddingLeft: '5%', display: 'flex', textTransform: 'capitalize', color: view == "medium" ? 'white' : ''}}>Medium</div>
          </div>
        </ToggleButton>
        <ToggleButton value="full" aria-label="full" color="secondary">
          <div style={buttonDiv}>
            <ArchitectureIcon style={{width: '10%', fontSize: '1.75rem', color: view == "full" ? 'white' : ''}}/>
            <div style={{width: '90%', fontSize: '1rem', paddingLeft: '5%', display: 'flex', textTransform: 'capitalize', color: view == "full" ? 'white' : ''}}>Full</div>
          </div>
        </ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
