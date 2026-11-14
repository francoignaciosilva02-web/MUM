import { Component } from 'react';
import EstadoError from '../ui/EstadoError';

/** Un error en una página no tumba la navegación (RNF08). */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <EstadoError mensaje="Algo salió mal al mostrar esta página." onReintentar={() => this.setState({ error: null })} />;
    }
    return this.props.children;
  }
}
