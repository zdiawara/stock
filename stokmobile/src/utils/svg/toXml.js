export default (content) => {
  return ({fill = '#000'} = {}) => `
        <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 262.63 298.1" style="enable-background:new 0 0 262.63 298.1;" xml:space="preserve">
            <style type="text/css">
                .st0{fill:${fill}}
            </style>
            ${content}
        </svg>
        `;
};
