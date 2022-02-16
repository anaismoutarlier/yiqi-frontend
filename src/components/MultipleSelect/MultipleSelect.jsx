// import React, {useState} from 'react';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import ListItemText from '@material-ui/core/ListItemText';
// import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// import Chip from '@material-ui/core/Chip';
// import { css, jsx } from '@emotion/react'

// //HELPER FUNCTIONS__________________
// import combineStyles from '../../helpers/combineStyles'

// //CONTEXT___________________
// import { ThemeContext } from '../../hooks/theme-context'


// const datas = [
//   'Board 1',
//   'Board 2',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

// function getStyles(name, item) {
//   return {
//     fontWeight:
//       item.indexOf(name) === -1
//         ? 'normal'
//         : 'bold'
//   };
// }

// function MultipleSelect(data) {

//   const [item, setitem] = useState([]);

//   const handleChange = (event) => {
//     setitem(event.target.value);
//   };

//   const handleChangeMultiple = (event) => {
//     const { options } = event.target;
//     const value = [];
//     for (let i = 0, l = options.length; i < l; i += 1) {
//       if (options[i].selected) {
//         value.push(options[i].value);
//       }
//     }
//     setitem(value);
//   };

//   return (

//     <ThemeContext.Consumer>
//        { ({ theme }) =>
 

//         <Select style={combineStyles(styles.select, theme.foreground)}
//           labelId="mutiple-chip-label"
//           id="mutiple-chip"
//           multiple
//           value={item}
//           onChange={handleChange}
//           input={<Input id="select-multiple-chip" />}
//           renderValue={(selected) => (
//             <div style={styles.chips}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} style={styles.chip} />
//               ))}
//             </div>
//           )}
      
//         >
//           {datas.map((name) => (
//             <MenuItem key={name} value={name} style={getStyles(name, item)}>
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </Form>

//         }
//       </ThemeContext.Consumer>
//   )
// };

// const styles = {

//     select: {
//       zIndex: 2000,
//     },
//     chips: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     chip: {
//       margin: 2,
//     },
//     noLabel: {
//     },
//     divstyle: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center'
// }
// }

// export default MultipleSelect