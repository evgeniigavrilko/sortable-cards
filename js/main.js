function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text');
  const draggedElement = document.getElementById(data);
  let dropTarget = event.target;

  while (dropTarget && !dropTarget.classList.contains('card')) {
    dropTarget = dropTarget.parentNode;
  }

  if (dropTarget && draggedElement !== dropTarget) {
    dropTarget.parentNode.insertBefore(draggedElement, dropTarget);
    updateCardNumbersAndIndices();
  }
}

function updateCardNumbersAndIndices() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    const numberElement = card.querySelector('.card__number');
    const indexValue = (index + 1).toString().padStart(2, '0');

    card.dataset.index = indexValue;
    numberElement.textContent = `${indexValue}`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('dragover', allowDrop);
    card.addEventListener('drop', drop);
  });

  updateCardNumbersAndIndices();
});
