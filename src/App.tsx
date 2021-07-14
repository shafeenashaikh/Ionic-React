import React, { useRef, useState } from 'react';

import { IonApp, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';


// import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import InputControl from './components/InputControl';


const App: React.FC = () => {
  const [ calculatedBmi, setCalculatedBmi ] = useState<number>();
  const [ error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg');

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const CalculateBMI = () => {
    const enterWeight = weightInputRef.current!.value;
    const enterHeight = weightInputRef.current!.value;

    if(!enterHeight || 
      !enterWeight ||
      +enterWeight <= 0 ||
      +enterHeight <= 0
      )
    {
      setError('please enter a valid (non-negative) number! ')
      return;
    }

    const WeightconversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightconversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;

    const weight = +enterWeight / WeightconversionFactor;
    const height = +enterHeight / heightconversionFactor;

    const bmi = weight / (height * height);

    setCalculatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';

  };

  const clearError = () => {
    setError('');
  };

  const selectCalcUnitsHandler = (selectValue: 'mkg' | 'ftlbs') => {
    setCalcUnits(selectValue);
  }

  return( 
  <React.Fragment>
  <IonAlert 
  isOpen={!!error} 
  message={error} 
  buttons={[{text: 'Okey', handler: clearError }]}
  
  />
  <IonApp>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle> BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
          <IonCol>
            <InputControl 
            selectedValue={calcUnits} 
            onSelectValue={selectCalcUnitsHandler}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">
                Your Height({calcUnits === 'mkg' ? 'meters' : 'feet'})</IonLabel>
              <IonInput type="number" ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">
                Your Weight ({calcUnits === 'mkg' ? 'kg' : 'lbs'})</IonLabel>
              <IonInput type="number" ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
       <BmiControls onCalculate={CalculateBMI}  onReset={resetInputs}/>
        { calculatedBmi &&(
        <BmiResult result={calculatedBmi}/>
        )}  
      </IonGrid>
    </IonContent>
  </IonApp>
  </React.Fragment>  
  )
};

export default App;
