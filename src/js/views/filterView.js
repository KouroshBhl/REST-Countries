import View from './View.js';
class filterView extends View {
  _parentEl = document.querySelector('.countries');
  _targetEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    const select = document.getElementById('filter');
    select.addEventListener('change', function () {
      const option = select.options[select.selectedIndex].value;
      handler(option);
    });
  }
}
export default new filterView();
