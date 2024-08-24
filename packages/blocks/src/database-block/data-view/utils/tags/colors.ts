export type SelectOptionColor = {
  color: string;
  name: string;
};

export const selectOptionColors: SelectOptionColor[] = [
  {
    color: 'var(--workbench-tag-red)',
    name: 'Red',
  },
  {
    color: 'var(--workbench-tag-pink)',
    name: 'Pink',
  },
  {
    color: 'var(--workbench-tag-orange)',
    name: 'Orange',
  },
  {
    color: 'var(--workbench-tag-yellow)',
    name: 'Yellow',
  },
  {
    color: 'var(--workbench-tag-green)',
    name: 'Green',
  },
  {
    color: 'var(--workbench-tag-teal)',
    name: 'Teal',
  },
  {
    color: 'var(--workbench-tag-blue)',
    name: 'Blue',
  },
  {
    color: 'var(--workbench-tag-purple)',
    name: 'Purple',
  },
  {
    color: 'var(--workbench-tag-gray)',
    name: 'Gray',
  },
  {
    color: 'var(--workbench-tag-white)',
    name: 'White',
  },
];

/** select tag color poll */
const selectTagColorPoll = selectOptionColors.map(color => color.color);

function tagColorHelper() {
  let colors = [...selectTagColorPoll];
  return () => {
    if (colors.length === 0) {
      colors = [...selectTagColorPoll];
    }
    const index = Math.floor(Math.random() * colors.length);
    const color = colors.splice(index, 1)[0];
    return color;
  };
}

export const getTagColor = tagColorHelper();
