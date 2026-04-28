import { useSelect } from '@wordpress/data';
import * as React from 'react';
import BrushIcon from '@mui/icons-material/Brush';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const presetMap = {
    'list':   'slim',  // Basic Management → slim
    'module': 'medium',  // Page Design → medium
    'quilt':  'full',  // Unrestricted Editing → default
};

export default function VerticalToggleButtons() {
  const [view, setView] = React.useState('list');
  const postId = useSelect(select => select('core/editor').getCurrentPostId());


  const handleChange = async (_: React.MouseEvent<HTMLElement>, nextView: string) => {
        if (!nextView) return; // MUI returns null if you click the already-selected button
        setView(nextView);

        const form = new FormData();
        form.append('action', 'wp_minimizer_set_preset');
        form.append('nonce', window.myPluginData.nonce);
        form.append('value', presetMap[nextView]);
        form.append('post_id', postId);
        await fetch(window.myPluginData.ajaxUrl, { method: 'POST', body: form });
        window.location.reload(); 
  };

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
      style={{width: '100%'}}
    >
      <ToggleButton value="list" aria-label="list">
        <view style={{width: '100%', padding: '0px 0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <BrushIcon style={{width: '10%', fontSize: '1.75rem'}}/>
          <view style={{width: '90%', fontSize: '1rem', paddingLeft: '5%', display: 'flex', textTransform: 'capitalize'}}>Basic Management</view>
        </view>
      </ToggleButton>
      <ToggleButton value="module" aria-label="module">
        <view style={{width: '100%', padding: '0px 0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <ViewQuiltIcon style={{width: '10%', fontSize: '1.75rem'}}/>
          <view style={{width: '90%', fontSize: '1rem', paddingLeft: '5%', display: 'flex', textTransform: 'capitalize'}}>Page Design</view>
        </view>
      </ToggleButton>
      <ToggleButton value="quilt" aria-label="quilt">
        <view style={{width: '100%', padding: '0px 0px', display: 'flex', flexDirection: 'row', alignItems: 'space-between' }}>
          <ArchitectureIcon style={{width: '10%', fontSize: '1.75rem'}}/>
          <view style={{width: '90%', fontSize: '1rem', paddingLeft: '5%', display: 'flex', textTransform: 'capitalize'}}>Unrestricted Editing</view>
        </view>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
