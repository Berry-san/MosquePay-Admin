// import React, { Component, } from 'react';
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';


// export default class EditorConvertToHTML extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty(),
//     };
//   }
 
//   onEditorStateChange = (editorState) => {
//     // console.log(editorState)
//     this.setState({
//       editorState,
//     });
//    const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
//    this.props.setAnswer(data);
//   };
 
//   render(){
//     const { editorState } = this.state;
//     return <div className='pb-12 border-2 '>
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={this.onEditorStateChange}    
//         toolbar={{
//           inline: { inDropdown: true },
//           list: { inDropdown: true },
//           textAlign: { inDropdown: true },
//           link: { inDropdown: true },
//           history: { inDropdown: true },
         
//         }}
//       />
//     </div>
//   }
// }