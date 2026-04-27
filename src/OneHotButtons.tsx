import * as React from 'react';
import BrushIcon from '@mui/icons-material/Brush';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function VerticalToggleButtons() {
  const [view, setView] = React.useState('list');

  const handleChange = (_: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
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
