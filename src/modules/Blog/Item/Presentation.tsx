import { Actions, Selectors } from 'modules/Blog/List';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as BackIconComponent } from 'src/images/components/icons/back.svg';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UHelmet from 'src/ui-components/UHelmet';
import UIcon from 'src/ui-components/UIcon';
import UShareButtons from 'src/ui-components/UShareButtons';
import USpinner from 'src/ui-components/USpinner';
import Content from './components/Content';
import ShortDescription from './components/ShortDescription';

export interface IPresentationProps extends Actions, Selectors {}

export default class Presentation extends React.PureComponent<IPresentationProps, any> {
  public render() {
    const { data: article, loading } = this.props.article;

    if (loading) {
      return <USpinner loading={loading} />;
    }

    if (!article) {
      return null;
    }

    return (
      <UBlock marginBottom={5}>
        <UHelmet title={article.title} description={article.shortDescription} />

        <UBlock
          marginTop={[3, 4]}
          textAlign={['center', 'left']}
          display="flex"
          justifyContent={['center', 'center', 'space-between']}
          alignItems="center"
        >
          <Link to="/articles">
            <UButton appearance="ghost" icon={<UIcon svg={BackIconComponent} size="small" />}>
              К списку статей
            </UButton>
          </Link>
          <UBlock display="flex" alignItems="center" visible={[false, false, true]}>
            Поделиться&nbsp;
            <UShareButtons iconSize={32} />
          </UBlock>
        </UBlock>

        <UBlock marginTop={4} marginBottom={[2, 2, 5]}>
          <ShortDescription {...article} />
        </UBlock>

        <UBlock
          my={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          visible={[true, true, false]}
        >
          <UBlock visible={[false, true]}>Поделиться&nbsp;</UBlock>
          <UShareButtons />
        </UBlock>

        <Content markdownText={article.text} />

        <UBlock marginTop={[4, 2]} visible={String(article.text).length > 300}>
          <UShareButtons />
        </UBlock>
      </UBlock>
    );
  }
}
