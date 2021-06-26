{% macro render(post) %}
    {% set repos = site.data['hexo-theme-rank'].repositories %}
    <style>
        .{{ post.slug }}.line {
            border-bottom: 1px dashed #ccc;
            margin-bottom: 7px;
        }
        .{{ post.slug }}.date,
        .{{ post.slug }}.description {
            padding-left: 15px;
        }
        .{{ post.slug }}.date {
            font-size: 12px;
            color: #737373;
        }
    </style>
    {% for repo in repos.repositories %}
        <div class="{{ post.slug }} line">
            <a class="user" href="{{ repo.owner.html_url }}" rel="noreferrer noopener" target="_blank">{{ repo.owner.login }}</a>/<a class="repo" href="{{ repo.html_url }}" rel="noreferrer noopener" target="_blank"><b>{{ repo.name }}</b></a>
            (
                <span class="stars"><b>Stars:</b> {{ numberToUnit(repo.stargazers_count) }}</span>, 
                <span class="stars"><b>Forks:</b> {{ numberToUnit(repo.forks_count) }}</span>, 
                <span class="stars"><b>Open issues:</b> {{ numberToUnit(repo.open_issues_count) }}</span>
            )
            <div class="{{ post.slug }} date">
                <span><b>Created at:</b> {{ repo.created_at }}</span>
                <span><b>Updated at:</b> {{ repo.updated_at }}</span>
                <span><b>Pushed at:</b> {{ repo.pushed_at }}</span>
            </div>
            <div class="{{ post.slug }} description">
                {{ repo.description }}
            </div>
        </div>
    {% endfor %}
{% endmacro %}
