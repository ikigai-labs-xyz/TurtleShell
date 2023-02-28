import TextPlaceholder from '../components/common/TextPlaceholder';

const OutputTableCell = ({ output, loading }) => {
  return (
    <div className={`output-${output}`}>
      {loading ? <TextPlaceholder /> : output}
    </div>
  )
}

export default OutputTableCell;