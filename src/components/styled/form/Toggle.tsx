import styled from 'styled-components';

// export const Toggle = () => {
//   return (
//     <div>
//       <Switch>
//         <input type="checkbox" />
//         <Slider />
//       </Switch>
//     </div>
//   );
// };

export const Switch = styled.label`
  margin-left: 0.5rem;
  position: relative;
  display: inline-block;
  width: 3.4rem;
  height: 1.7rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: '';
    height: 1.25rem;
    width: 1.25rem;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  ${Switch} input:checked+ & {
    background-color: navy;
  }

  ${Switch} input:checked + &::before {
    transform: translateX(1.6rem);
  }
`;
