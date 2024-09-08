import { Meta, StoryObj} from '@storybook/react';
import { Dropdown } from './dropdown';
import { action } from '@storybook/addon-actions';

const withBackgroundChange = (Story: any, context:any) => {
    const { colorTheme } = context.args;
    const backgroundColor = colorTheme == 'light' ? '#F1F1F1' : '#15232D';
    return (
        <div style={{backgroundColor, padding: '20px'}} className="w-screen h-60 flex justify-center items-center">
            <Story {...context} />
        </div>
    );
};

const meta = {
    title: 'Components/ui/Dropdown',
    component: Dropdown,
    decorators: [withBackgroundChange],
    parameters: {
        layout: 'centered',
        backgrounds: {
            disable: false,
        }
    },
    tags: ['autodocs'],
    argTypes: {
        colorTheme: {
            control: {
                type: "radio",
            },
            options: ["light", "dark"]
        },
    },
    args: {
        onSelect: action('select-action'),
    },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args:{
        options: [{key: 0, value: "vercel"}, {key: 1, value: "localhost"}],
        colorTheme:"light",
        size:"large",
        name: "Label",
        id: "label",
        enabled: true
    }
}
