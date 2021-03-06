import { useCallback, useRef } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import './App.scss';
import { setCurrent } from './store';
import { TimesSeriesItem } from './utils';
import WeatherIcon from './components/weatherIcon';
import TempDisplay from './components/temdisplay';
import LocationDate from './components/locationDate';
import ForecastListItem from './components/forecastListItem/forecastListItem';
import ErrorBoundary from './components/errorBoundary';

function App({ current, forecast, ui, setCurrent }: RootStateOrAny) {
  
  const fdRef = useRef<HTMLDivElement>(null);
  const onWheel = useCallback((event) => {
    const containerScrollPosition: number = fdRef.current?.scrollLeft || 0;
    fdRef.current?.scrollTo({
      top: 0,
      left: containerScrollPosition + event.deltaY * 6,
      behavior: 'smooth'
    });
  }, [])
  return (

    <div id="App">
      <ErrorBoundary status={ui.status}>
        <div className="mainDisplay">
          <WeatherIcon tabIndex={0} icon={current.weather && current.weather[0].icon} className="main" />
          <div className="info-wrapper">
            <TempDisplay />
            <LocationDate />
          </div>
        </div>
        <div ref={fdRef} id="forecastDisplay" onWheel={onWheel}>
          {
            forecast.map((timeSeriesItem: TimesSeriesItem, index: number) => {
              return <ForecastListItem
                key={index}
                item={timeSeriesItem}
                onClick={() => setCurrent(timeSeriesItem)}
              />
            })
          }
        </div>
      </ErrorBoundary>
    </div>
  );
}


export default connect((state) => ({ ...state }), (dispatch) => {
  return {
    setCurrent: (data: TimesSeriesItem) => dispatch(setCurrent(data)),
  }
})(App);
export const TestApp = App;